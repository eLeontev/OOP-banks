class ATM {
    constructor(supportedBanks,  balance, limit) {
        this.supportedBanks = supportedBanks;

        this.balance = balance;
        this.limit = limit;

        this.cardAPI = null;
        this.isOnService = null;

        this.getSupportedBanks = this.getSupportedBanks.bind(this);
        this.isATMReadyToWork = this.isATMReadyToWork.bind(this);

        this.isSecurityGuardHasAccess = this.isSecurityGuardHasAccess.bind(this);
        this.isCardSupported = this.isCardSupported.bind(this);
        this.getCard = this.getCard.bind(this);
        this.getBalance = this.getBalance.bind(this);
        this.endSecurityGuardOperation = this.endSecurityGuardOperation.bind(this);
    }

    isSecurityGuardHasAccess(securityGuardSupportedBanks) {
        let {
            compareSupportedBanks,
            getSupportedBanks,
            checkAccess,
            isATMReadyToWork,
        } = this;

        let {error} = checkAccess(
            isATMReadyToWork,
            compareSupportedBanks(getSupportedBanks(), securityGuardSupportedBanks),
        );

        if (error) {
            return {error};
        }

        this.isOnService = true;

        return {success: true};
    }

    getSupportedBanks() {
        return this.supportedBanks;
    }

    isCardSupported(cardAPI, ownerId) {
        let {
            isATMReadyToWork,
            checkAccess,
            compareOwner,
            compareSupportedBanks,
            getSupportedBanks,
        } = this;


        let {error} = checkAccess(
            isATMReadyToWork,
            compareOwner(cardAPI.getOwnerId(), ownerId),
            compareSupportedBanks(getSupportedBanks(), cardAPI.getSupportedBanks()),
        );

        if (error) {
            return {error};
        }

        this.cardAPI = cardAPI;

        return {success: true};
    }

    compareSupportedBanks(ATMSupportedBanks, supportedBanks) {
        return () => {
            let isSupported = ATMSupportedBanks
                .some(ATMSupportedBank => (
                    supportedBanks.some(supportedBank => supportedBank  === ATMSupportedBank))
                );

            if (!isSupported) {
                return {
                    error: 'has no supported banks',
                }
            }
        }
    }

    compareOwner(cardOwnerId, ownerId) {
        return () => {
            if (cardOwnerId !== ownerId) {
                return {
                    error: 'incorrect owner',
                }
            }
        }
    }

    isATMReadyToWork() {
        let {cardAPI, isOnService} = this;

        let isATMNotReady = cardAPI || isOnService;

        if (isATMNotReady) {
            return {
                error: 'ATM is not ready',
            }
        }
    }

    checkAccess(...fn) {
        return fn.reduce((error, fn) => error || fn(), null) || {};
    }

    getCard() {
        return this.withResult('cardAPI');
    }

    endSecurityGuardOperation() {
        return this.withResult('isOnService');
    }

    withResult(property, success = true) {
        if (this[property]){
            this[property] = null;

            return {success};
        }
    }

    getBalance() {
        return this.cardAPI.getBalance();
    }

    operationIsNotSupported() {
        return {
            error: 'operation is not supported',
        }
    }

    getAPI() {
        let {
            isSecurityGuardHasAccess,
            isCardSupported,
            getCard,
            getBalance,
            operationIsNotSupported,
            endSecurityGuardOperation,
            cashOutFromCard,
            rechargeMoney,
            collectMoney,
            setMoney,
        } = this;

        return {
            isSecurityGuardHasAccess,
            isCardSupported,
            getCard,
            getBalance,
            operationIsNotSupported,
            endSecurityGuardOperation,
            cashOutFromCard,
            rechargeMoney,
            collectMoney,
            setMoney,
        }
    }

    cashOutFromCard() {
        return this.operationIsNotSupported();
    }
    rechargeMoney() {
        return this.operationIsNotSupported();
    }
    collectMoney() {
        return this.operationIsNotSupported();
    }
    setMoney() {
        return this.operationIsNotSupported();
    }
}

module.exports = ATM;
