class SecurityGuard {
    constructor(supportedBanks) {
        this.supportedBanks = supportedBanks;
    }

    getAccessToATM(ATM_API) {
        this.ATM_API = ATM_API;

        let {isSecurityGuardHasAccess} = this.ATM_API;

        let {success, error} = isSecurityGuardHasAccess(this.supportedBanks);

        if (error) {
            return {error};
        }

        return success;
    }

    endATMOperation() {
        let {success, error} = this.withCheckATMConnection('endSecurityGuardOperation');

        if (error) {
            return {error};
        }

        this.ATM_API = null;

        return {success};
    }

    collectATMMoney(amount) {
        return this.withError('withCheckATMConnection', 'collectMoney', amount);
    }

    rechargeBalance(amount) {
        return this.withError('withCheckATMConnection', 'rechargeMoney', amount);
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

    withError(method, ...data) {
        let {success, error} = this[method](...data);

        if (error) {
            return {error};
        }

        return {success};
    }
}

module.exports = SecurityGuard;
