export default function dateBetween(from: string, to: string, check: string): boolean {
    var splitFrom = from.split('-');
    var splitTo = to.split('-');
    var splitCheck = check.split('-');

    var dateFrom = new Date(parseInt(splitFrom[2]), parseInt(splitFrom[1]) - 1, parseInt(splitFrom[0]));
    var dateTo = new Date(parseInt(splitTo[2]), parseInt(splitTo[1]) - 1, parseInt(splitTo[0]));
    var dateCheck = new Date(parseInt(splitCheck[2]), parseInt(splitCheck[1]) - 1, parseInt(splitCheck[0]));

    return dateCheck >= dateFrom && dateCheck <= dateTo;
}
