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
    { headerName: "Total", field: "summary", width: 60, suppressSizeToFit: true },
    { headerName: "Date Last Accessed", field: "date", width: 90, suppressSizeToFit: true },
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

  creatRow(user: UserMetric) {
    // let row = {
    //   user: user.name, //this.formatName(user.name, user.email),
    //   summary: 0,
    //   date: user.last,
    //   github: user.nickname,
    // };
    // return row;
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

  zeroEntries(los: Lo[], row) {
    // los.forEach((lab) => {
    //   row[`${lab.title}`] = 0;
    // });
  }

  zeroEntriesComplete(los: Lo[], row) {
    // los.forEach((lab) => {
    //   lab.los.forEach((step) => {
    //     row[`${lab.title + step.shortTitle}`] = 0;
    //   });
    // });
  }

  populateCols(calendar: Calendar) {
    if (calendar) {
      calendar.weeks.forEach((week) => {
        const date = Date.parse(week.date);
        const dateStr = formatDate(date);
        this.columnDefs.push({
          headerName: "" + week.title,
          width: 48,
          field: dateStr,
          suppressSizeToFit: true,
          cellClassRules: deepScheme,
          menuTabs: [],
        });
      });
    }
  }

  populateRow(user: UserMetric, los: Lo[]) {
    // let row = this.creatRow(user);
    // this.zeroEntries(los, row);
    // let summaryCount = 0;
    // user.labActivity.forEach((labMetric) => {
    //   let labSummaryCount = 0;
    //   if (labMetric) {
    //     labMetric.metrics.forEach((stepMetric) => {
    //       if (stepMetric.count) labSummaryCount = labSummaryCount + stepMetric.count;
    //     });
    //     labSummaryCount = Math.round(labSummaryCount / 2);
    //     row[`${labMetric.title}`] = labSummaryCount;
    //   }
    //   summaryCount = summaryCount + labSummaryCount;
    // });
    // row.summary = summaryCount;
    // this.rowData.push(row);
  }
}
