$(document).ready(function() {
    fetch("/api/trains")
        .then(resp => resp.json())
        .then(val => {
        let home = [];
        let work = [];
        for (ele of val) {
            if (ele === "SENTINAL") {
                continue;
            }
            const [direction, line, time] = ele.split(',')

            const now = Date.now()
            const datetime = new Date(time);
            const diff = datetime.getTime() - now;
            const minutes = diff / 1000 / 60;
            if (minutes < 0) {
                continue;
            }
            const seconds = Math.floor((60 * (minutes - Math.floor(minutes))));
            const min = Math.floor(minutes);
            const timeStr = `${min}m ${seconds}s`;

            if (["4", "5"].includes(line)) {
                if (direction.includes("Uptown")) {
                    continue;
                }
                work.push([line, timeStr])
            }

            if (["C", "E"].includes(line)) {
                if (direction.includes("Uptown")) {
                    continue;
                }
                home.push([line, timeStr])
            }
        }

        let workHtml = "";
        for (ele of work) {
            workHtml = workHtml.concat(`<div>${ele[0]} - ${ele[1]}</div>`)
        }
        let w = document.getElementById("work");
        w.innerHTML = workHtml;

        let homeHtml = "";
        for (ele of home) {
            homeHtml = homeHtml.concat(`<div>${ele[0]} - ${ele[1]}</div>`)
        }
        let h = document.getElementById("home");
        h.innerHTML = homeHtml;
    });
});
