export default class TotalTimer {
    public time: number;
    public globalActive: boolean;

    public constructor(time?: number, globalActive?: boolean) {
        this.time = time === undefined ? 0 : time;
        this.globalActive = globalActive === undefined ? false : globalActive;
    }
}