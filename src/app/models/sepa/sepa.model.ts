export class SepaModel {
    id: number
    iban: string
    bic: string
    holderName: string

    constructor(id: number, iban: string, bic: string, holderName: string) {
        this.id = id;
        this.iban = iban;
        this.bic = bic;
        this.holderName = holderName;
    }
}