const { deployContract, offsettedIndex } = require('../helpers.js');
const { expect } = require('chai');
const { BigNumber } = require('ethers');
const { constants } = require('@openzeppelin/test-helpers');
const { ZERO_ADDRESS } = constants;

const createTestSuite = ({ contract, constructorArgs }) =>
  function () {
    let offsetted;

    context(`${contract}`, function () {
      beforeEach(async function () {
        this.erc721aQueryable = await deployContract(contract, constructorArgs);

        this.startTokenId = this.erc721aQueryable.startTokenId
          ? (await this.erc721aQueryable.startTokenId()).toNumber()
          : 0;

        offsetted = (...arr) => offsettedIndex(this.startTokenId, arr);
      });

      const expectExplicitOwnershipBurned = function (explicitOwnership, address) {
        expect(explicitOwnership.burned).to.eql(true);
        expect(explicitOwnership.addr).to.eql(address);
        expect(explicitOwnership.startTimestamp).to.not.eql(BigNumber.from(0));
        expect(explicitOwnership.extraData).to.equal(BigNumber.from(0));
      };

      const expectExplicitOwnershipNotExists = function (explicitOwnership) {
        expect(explicitOwnership.burned).to.eql(false);
        expect(explicitOwnership.addr).to.eql(ZERO_ADDRESS);
        expect(explicitOwnership.startTimestamp).to.eql(BigNumber.from(0));
        expect(explicitOwnership.extraData).to.equal(BigNumber.from(0));
      };

      const expectExplicitOwnershipExists = function (explicitOwnership, address) {
        expect(explicitOwnership.burned).to.eql(false);
        expect(explicitOwnership.addr).to.eql(address);
        expect(explicitOwnership.startTimestamp).to.not.eql(BigNumber.from(0));
        expect(explicitOwnership.extraData).to.equal(BigNumber.from(0));
      };

      context('with no minted tokens', async function () {
        beforeEach(async function () {
          const [owner, addr1] = await ethers.getSigners();
          this.owner = owner;
          this.addr1 = addr1;
        });

        describe('tokensOfOwner', async function () {
          it('returns empty array', async function () {
            expect(await this.erc721aQueryable.tokensOfOwner(this.owner.address)).to.eql([]);
            expect(await this.erc721aQueryable.tokensOfOwner(this.addr1.address)).to.eql([]);
          });
        });

        describe('tokensOfOwnerIn', async function () {
          it('returns empty array', async function () {
            expect(await this.erc721aQueryable.tokensOfOwnerIn(this.owner.address, 0, 9)).to.eql([]);
            expect(await this.erc721aQueryable.tokensOfOwnerIn(this.addr1.address, 0, 9)).to.eql([]);
          });
        });

        describe('explicitOwnershipOf', async function () {
          it('returns empty struct', async function () {
            expectExplicitOwnershipNotExists(await this.erc721aQueryable.explicitOwnershipOf(0));
            expectExplicitOwnershipNotExists(await this.erc721aQueryable.explicitOwnershipOf(1));
          });
        });

        describe('explicitOwnershipsOf', async function () {
          it('returns empty structs', async function () {
            const tokenIds = [0, 1, 2, 3];
            const explicitOwnerships = await this.erc721aQueryable.explicitOwnershipsOf(tokenIds);
            for (let i = 0; i < explicitOwnerships.length; ++i) {
              expectExplicitOwnershipNotExists(explicitOwnerships[i]);
            }
          });
        });
      });

      context('with minted tokens', async function () {
        beforeEach(async function () {
          const [owner, addr1, addr2, addr3, addr4] = await ethers.getSigners();
          this.owner = owner;
          this.addr1 = addr1;
          this.addr2 = addr2;
          this.addr3 = addr3;
          this.addr4 = addr4;

          this.addr1.expected = {
            balance: 1,
            tokens: [offsetted(0)],
          };

          this.addr2.expected = {
            balance: 2,
            tokens: offsetted(1, 2),
          };

          this.addr3.expected = {
            balance: 3,
            tokens: offsetted(3, 4, 5),
          };

          this.addr4.expected = {
            balance: 0,
            tokens: [],
          };

          this.owner.expected = {
            balance: 3,
            tokens: offsetted(6, 7, 8),
          };

          this.lastTokenId = offsetted(8);
          this.currentIndex = this.lastTokenId.add(1);

          this.mintOrder = [this.addr1, this.addr2, this.addr3, this.addr4, owner];

          for (const minter of this.mintOrder) {
            const balance = minter.expected.balance;
            if (balance > 0) {
              await this.erc721aQueryable['safeMint(address,uint256)'](minter.address, balance);
            }
            // sanity check
            expect(await this.erc721aQueryable.balanceOf(minter.address)).to.equal(minter.expected.balance);
          }
        });

        describe('tokensOfOwner', async function () {
          it('initial', async function () {
            for (const minter of this.mintOrder) {
              const tokens = await this.erc721aQueryable.tokensOfOwner(minter.address);
              expect(tokens).to.eql(minter.expected.tokens);
            }
          });

          it('after a transfer', async function () {
            // Break sequential order by transfering 7th token from owner to addr4
            const tokenIdToTransfer = [offsetted(7)];
            await this.erc721aQueryable.transferFrom(this.owner.address, this.addr4.address, tokenIdToTransfer[0]);

            // Load balances
            const ownerTokens = await this.erc721aQueryable.tokensOfOwner(this.owner.address);
            const addr4Tokens = await this.erc721aQueryable.tokensOfOwner(this.addr4.address);

            // Verify the function can still read the correct token ids
            expect(ownerTokens).to.eql(offsetted(6, 8));
            expect(addr4Tokens).to.eql(tokenIdToTransfer);
          });

          it('after a burn', async function () {
            // Burn tokens
            const tokenIdToBurn = [offsetted(7)];
            await this.erc721aQueryable.burn(tokenIdToBurn[0]);

            // Load balances
            const ownerTokens = await this.erc721aQueryable.tokensOfOwner(this.owner.address);

            // Verify the function can still read the correct token ids
            expect(ownerTokens).to.eql(offsetted(6, 8));
          });

          it('with direct set burn bit', async function () {
            await this.erc721aQueryable['safeMint(address,uint256)'](this.addr3.address, 3);
            await this.erc721aQueryable['safeMint(address,uint256)'](this.addr3.address, 2);
            const nextTokenId = this.owner.expected.tokens[this.owner.expected.tokens.length - 1].add(1);
            expect(await this.erc721aQueryable.tokensOfOwner(this.addr3.address))
              .to.eql(this.addr3.expected.tokens.concat(Array.from({length: 5}, (_, i) => nextTokenId.add(i))));
            await this.erc721aQueryable.directSetBurnBit(nextTokenId);
            expect(await this.erc721aQueryable.tokensOfOwner(this.addr3.address))
              .to.eql(this.addr3.expected.tokens.concat(Array.from({length: 2}, (_, i) => nextTokenId.add(3 + i))));
          });
        });

        describe('tokensOfOwnerIn', async function () {
          const expectCorrect = async function (addr, start, stop) {
            if (BigNumber.from(start).gte(BigNumber.from(stop))) {
              await expect(this.erc721aQueryable.tokensOfOwnerIn(addr, start, stop)).to.be.revertedWith(
                'InvalidQueryRange'
              );
            } else {
              const expectedTokens = (await this.erc721aQueryable.tokensOfOwner(addr)).filter(
                (x) => BigNumber.from(start).lte(x) && BigNumber.from(stop).gt(x)
              );
              const tokens = await this.erc721aQueryable.tokensOfOwnerIn(addr, start, stop);
              expect(tokens).to.eql(expectedTokens);
            }
          };

          const subTests = function (description, beforeEachFunction) {
            describe(description, async function () {
              it('all token ids', async function () {
                await beforeEachFunction.call(this);
                await expectCorrect.call(this, this.owner.address, offsetted(0), this.currentIndex);
                await expectCorrect.call(this, this.owner.address, offsetted(0), this.currentIndex.add(1));
              });

              it('partial token ids', async function () {
                await beforeEachFunction.call(this);
                const ownerTokens = this.owner.expected.tokens;
                const start = ownerTokens[0];
                const stop = ownerTokens[ownerTokens.length - 1] + 1;
                for (let o = 1; o <= ownerTokens.length; ++o) {
                  // Start truncated.
                  await expectCorrect.call(this, this.owner.address, start + o, stop);
                  // End truncated.
                  await expectCorrect.call(this, this.owner.address, start, stop - o);
                  // Start and end truncated. This also tests for start + o >= stop - o.
                  await expectCorrect.call(this, this.owner.address, start + o, stop - o);
                }
                for (let l = 0; l < ownerTokens.length; ++l) {
                  for (let o = 0, n = parseInt(this.currentIndex) + 1; o <= n; ++o) {
                    // Sliding window.
                    await expectCorrect.call(this, this.owner.address, o, o + l);
                  }
                }
              });
            });
          };

          subTests('initial', async function () {});

          subTests('after a token tranfer', async function () {
            await this.erc721aQueryable.transferFrom(this.owner.address, this.addr4.address, offsetted(7));
          });

          subTests('after a token burn', async function () {
            await this.erc721aQueryable.burn(offsetted(7));
          });

          it('with direct set burn bit', async function () {
            await this.erc721aQueryable['safeMint(address,uint256)'](this.addr3.address, 3);
            await this.erc721aQueryable['safeMint(address,uint256)'](this.addr3.address, 2);
            const nextTokenId = this.owner.expected.tokens[this.owner.expected.tokens.length - 1].add(1);
            expect(await this.erc721aQueryable.tokensOfOwnerIn(this.addr3.address, 0, 99))
              .to.eql(this.addr3.expected.tokens.concat(Array.from({length: 5}, (_, i) => nextTokenId.add(i))));
            await this.erc721aQueryable.directSetBurnBit(nextTokenId);
            expect(await this.erc721aQueryable.tokensOfOwnerIn(this.addr3.address, 0, 99))
              .to.eql(this.addr3.expected.tokens.concat(Array.from({length: 2}, (_, i) => nextTokenId.add(3 + i))));
          })
        });

        describe('explicitOwnershipOf', async function () {
          it('token exists', async function () {
            const tokenId = this.owner.expected.tokens[0];
            const explicitOwnership = await this.erc721aQueryable.explicitOwnershipOf(tokenId);
            expectExplicitOwnershipExists(explicitOwnership, this.owner.address);
          });

          it('after a token burn', async function () {
            const tokenId = this.owner.expected.tokens[0];
            await this.erc721aQueryable.burn(tokenId);
            const explicitOwnership = await this.erc721aQueryable.explicitOwnershipOf(tokenId);
            expectExplicitOwnershipBurned(explicitOwnership, this.owner.address);
          });

          it('after a token transfer', async function () {
            const tokenId = this.owner.expected.tokens[0];
            await this.erc721aQueryable.transferFrom(this.owner.address, this.addr4.address, tokenId);
            const explicitOwnership = await this.erc721aQueryable.explicitOwnershipOf(tokenId);
            expectExplicitOwnershipExists(explicitOwnership, this.addr4.address);
          });

          it('out of bounds', async function () {
            const explicitOwnership = await this.erc721aQueryable.explicitOwnershipOf(this.currentIndex);
            expectExplicitOwnershipNotExists(explicitOwnership);
          });

          it('with direct set burn bit', async function () {
            await this.erc721aQueryable.directSetBurnBit(this.addr3.expected.tokens[0]);
            for (let i = 0; i < this.addr3.expected.tokens.length; ++i) {
              const explicitOwnership = await this.erc721aQueryable.explicitOwnershipOf(this.addr3.expected.tokens[i]);
              expectExplicitOwnershipBurned(explicitOwnership, this.addr3.address);
            }
          });
        });

        describe('explicitOwnershipsOf', async function () {
          it('tokens exist', async function () {
            const tokenIds = [].concat(this.owner.expected.tokens, this.addr3.expected.tokens);
            const explicitOwnerships = await this.erc721aQueryable.explicitOwnershipsOf(tokenIds);
            for (let i = 0; i < tokenIds.length; ++i) {
              const owner = await this.erc721aQueryable.ownerOf(tokenIds[i]);
              expectExplicitOwnershipExists(explicitOwnerships[i], owner);
            }
          });

          it('after a token burn', async function () {
            const tokenIds = [].concat(this.owner.expected.tokens, this.addr3.expected.tokens);
            await this.erc721aQueryable.burn(tokenIds[0]);
            const explicitOwnerships = await this.erc721aQueryable.explicitOwnershipsOf(tokenIds);
            expectExplicitOwnershipBurned(explicitOwnerships[0], this.owner.address);
            for (let i = 1; i < tokenIds.length; ++i) {
              const owner = await this.erc721aQueryable.ownerOf(tokenIds[i]);
              expectExplicitOwnershipExists(explicitOwnerships[i], owner);
            }
          });

          it('after a token transfer', async function () {
            const tokenIds = [].concat(this.owner.expected.tokens, this.addr3.expected.tokens);
            await this.erc721aQueryable.transferFrom(this.owner.address, this.addr4.address, tokenIds[0]);
            const explicitOwnerships = await this.erc721aQueryable.explicitOwnershipsOf(tokenIds);
            expectExplicitOwnershipExists(explicitOwnerships[0], this.addr4.address);
            for (let i = 1; i < tokenIds.length; ++i) {
              const owner = await this.erc721aQueryable.ownerOf(tokenIds[i]);
              expectExplicitOwnershipExists(explicitOwnerships[i], owner);
            }
          });

          it('out of bounds', async function () {
            const tokenIds = [].concat([this.currentIndex], this.addr3.expected.tokens);
            const explicitOwnerships = await this.erc721aQueryable.explicitOwnershipsOf(tokenIds);
            expectExplicitOwnershipNotExists(explicitOwnerships[0]);
            for (let i = 1; i < tokenIds.length; ++i) {
              const owner = await this.erc721aQueryable.ownerOf(tokenIds[i]);
              expectExplicitOwnershipExists(explicitOwnerships[i], owner);
            }
          });
        });
      });
    });
  };

describe(
  'ERC721AQueryable',
  createTestSuite({
    contract: 'ERC721AQueryableMock',
    constructorArgs: ['Azuki', 'AZUKI'],
  })
);

describe(
  'ERC721AQueryable override _startTokenId()',
  createTestSuite({
    contract: 'ERC721AQueryableStartTokenIdMock',
    constructorArgs: ['Azuki', 'AZUKI', 1],
  })
);
