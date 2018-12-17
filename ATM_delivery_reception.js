let ATM = require('./ATM');
let ATM_delivery = require('./ATM_delivery');
let ATM_reception = require('./ATM_reception');


class ATM_delivery_reception extends ATM {
    constructor(...props) {
        super(...props);

        this.initExtendedMethods(ATM_delivery, ATM_reception);

        this.cashOutFromCard = this.cashOutFromCard.bind(this);
        this.rechargeMoney = this.rechargeMoney.bind(this);
        this.collectMoney = this.collectMoney.bind(this);
        this.setMoney = this.setMoney.bind(this);
    }

    initExtendedMethods(deliveryClass, receptionClass) {
        let {cashOutFromCard, rechargeMoney} = deliveryClass.prototype;
        let {collectMoney, setMoney} = receptionClass.prototype;

        Object.assign(this, {
            cashOutFromCard,
            rechargeMoney,
            collectMoney,
            setMoney,
        });
    }

    getAPI() {
        let {
            cashOutFromCard,
            rechargeMoney,
            collectMoney,
            setMoney,
        } = this;

        return Object.assign(super.getAPI(), {
            cashOutFromCard,
            rechargeMoney,
            collectMoney,
            setMoney,
        })
    }
}

module.exports = ATM_delivery_reception;
