export default class Timer {
    public segmentTime: number;
    public active: boolean;
    public activated: boolean;
    public id: string;
    public avg: number | undefined;
    public best: number | undefined;
    public personal: number | undefined;
    public expected: number;
    public attempts: number;
    public runs: any[];
    public comparisonTime: number | undefined;
    public constructor(id: string, expected: number,
        segmentTime?: number, active?: boolean, activated?: boolean,
        avg?: number, best?: number, personal?: number,
        attempts?: number, comparisonTime?: number, runs?: any[]) {
        this.id = id;
        this.expected = expected;
        this.segmentTime = segmentTime ? segmentTime : 0;
        this.active = active ? active : false;
        this.activated = activated ? activated : false;
        this.avg = avg ? avg : undefined;
        this.best = best ? best : undefined;
        this.personal = personal ? personal : undefined;
        this.attempts = attempts ? attempts : 0;
        this.comparisonTime = comparisonTime ? comparisonTime : 0;
        this.runs = runs ? runs : [];
    }
}
