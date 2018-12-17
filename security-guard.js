class SecurityGuard {
    constructor(supportedBanks) {
        this.supportedBanks = supportedBanks;
    }

    getAccessToATM(ATM_API) {
        this.ATM_API = ATM_API;

        let {getSecurityGuardAccess} = this.ATM_API;

        let {success, error} = getSecurityGuardAccess(this.supportedBanks);

        if (error) {
            return {error};
        }

        return success;
    }

    endOperationWithATM() {
        let {success, error} = this.withCheckATMConnection('endSecurityGuardOperation');

        if (error) {
            return {error};
        }

        this.ATM_API = null;

        return {success};
    }

    getMoneyCashFromATM(amount) {
        return this.withResult('withCheckATMConnection', 'collectMoney', amount);
    }

    rechargeBalanceOfATM(amount) {
        return this.withResult('withCheckATMConnection', 'rechargeMoney', amount);
    }

    withCheckATMConnection(method, data) {
        let {ATM_API} = this;

        if (ATM_API) {
            return ATM_API[method](data);
        }

        return {
            error: 'operation is not allowed',
        }
    }

    withResult(method, ...data) {
        let {success, error} = this[method](...data);

        if (error) {
            return {error};
        }

        return {success};
    }
}

module.exports = SecurityGuard;
