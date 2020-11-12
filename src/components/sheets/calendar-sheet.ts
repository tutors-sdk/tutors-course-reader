import type { ICellRendererParams } from "ag-grid-community";
import type { Calendar, Lo } from "../../services/course/lo";
import type { UserMetric } from "../../services/analytics/metrics-types";
import { deepScheme } from "./heat-map-colours";
import { formatDate } from "../../services/utils/utils";

export let options = {
  animateRows: true,
  headerHeight: 120,
  defaultColDef: {
    sortable: true,
    resizable: true,
  },
  enableRangeSelection: true,
  enableCellChangeFlash: true,
  getRowNodeId: function (data) {
    return data.github;
  },
};

export class CalendarSheet {
  title = "Tutors Time";
  subtitle = "Activity in the Semester";

  columnDefs: any = [
    { headerName: "User", field: "user", width: 180, suppressSizeToFit: true, pinned: "left" },
    { headerName: "Github", field: "github", width: 80, suppressSizeToFit: true, cellRenderer: this.renderGithub },
    { headerName: "Day", field: "date", width: 90, suppressSizeToFit: true },
  ];
  sortModel = [{ colId: "summary", sort: "dsc" }];
  rowData = [];

  renderGithub(params: ICellRendererParams) {
    if (params.value) {
      var nameElement = document.createElement("span");
      var a = document.createElement("a");
      var linkText = document.createTextNode(params.value);
      a.appendChild(linkText);
      a.title = params.value;
      a.href = "http://github.com/" + a.title;
      a.setAttribute("target", "_blank");
      nameElement.appendChild(a);
      return nameElement;
    }
  }

  formatName(userName: string, email: string) {
    let name = userName;
    const fullName = name;
    if (name === email) {
      name = "~~ " + email;
    } else {
      var firstName = fullName.split(" ").slice(0, -1).join(" ");
      var lastName = fullName.split(" ").slice(-1).join(" ");
      name = lastName + ", " + firstName;
    }
    return name;
  }

  creatRow(user: UserMetric, day: number) {
    const days = ["Mon", "Tue", "Wed", "Thur", "Fri", "Sat", "Sun"];
    let row = {
      user: "",
      date: days[day],
      github: "",
    };
    if (day == 0) {
      row.user = user.name;
      row.github = user.nickname;
    }
    return row;
  }

  render(grid) {
    if (grid) {
      const api = grid.gridOptions.api;
      api.setColumnDefs(this.columnDefs);
      api.setRowData(this.rowData);
    }
  }

  clear(grid) {
    if (grid) {
      grid.gridOptions.api.setRowData([]);
      this.rowData = [];
      this.columnDefs.length = 4;
    }
  }

  populateCols(calendar: Calendar) {
    const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    if (calendar) {
      calendar.weeks.forEach((week) => {
        const date = Date.parse(week.date);
        const dateStr = formatDate(date);
        this.columnDefs.push({
          headerName: `${week.title}: ${monthNames[week.dateObj.getMonth()]}`,
          width: 48,
          field: dateStr,
          suppressSizeToFit: true,
          cellClassRules: deepScheme,
          menuTabs: [],
        });
      });
    }
  }

  populateRow(user: UserMetric, calendar: Calendar) {
    for (let day = 0; day < 7; day++) {
      let row = this.creatRow(user, day);
      user.calendarActivity.forEach((measure) => {
        for (let i = 0; i < calendar.weeks.length - 1; i++) {
          if (
            measure.dateObj >= Date.parse(calendar.weeks[i].date) &&
            measure.dateObj < Date.parse(calendar.weeks[i + 1].date)
          ) {
            const col = formatDate(calendar.weeks[i].date);
            const date2 = measure.dateObj;
            const date1 = Date.parse(calendar.weeks[i].date);
            const differenceInTime = date2 - date1;
            const differenceInDays = differenceInTime / (1000 * 3600 * 24);
            if (differenceInDays == day) {
              row[col] = measure.metric;
            }
          }
        }
      });
      this.rowData.push(row);
    }
  }
}
