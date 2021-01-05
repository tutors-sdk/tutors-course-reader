import type { Lo } from "../../services/course/lo";
import { LabSheet } from "./lab-sheet";
import { deepScheme } from "./heat-map-colours";
import type { User } from "../../services/analytics/metrics-types";
import type { ICellRendererParams } from "ag-grid-community";

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
  getRowHeight: function (params) {
    if (params.data.user) {
      return 60;
    }
    return 25;
  },
  getRowStyle: function (params) {
    if (params.data.user) {
      return { background: "#B2E3F1" };
    }
  },
};

export class LabLiveSheet extends LabSheet {
  title = "Who is Here?";
  subtitle = "Students doing labs right now";
  rowData = [];

  columnDefs: any = [
    { headerName: "Github Profile Name", field: "user", width: 180, suppressSizeToFit: true, pinned: "left" },
    {
      headerName: "Github",
      field: "github",
      width: 80,
      suppressSizeToFit: true,
      cellRenderer: this.renderGithub,
    },
    { headerName: "Topic", field: "topic", width: 120, suppressSizeToFit: true },
  ];

  renderGithub(params: ICellRendererParams) {
    if (params.value) {
      var nameElement = document.createElement("span");
      var a = document.createElement("a");

      let img = document.createElement("img");
      img.src = `http://github.com/${params.value}.png`;
      img.width = 120;
      a.append(img);
      a.title = params.value;
      a.href = `http://github.com/${params.value}`;
      a.setAttribute("target", "_blank");
      nameElement.appendChild(a);
      return nameElement;
    }
  }

  populateCols(los: Lo[]) {
    los.forEach((lab) => {
      this.columnDefs.push({
        headerName: lab.title,
        width: 42,
        field: lab.title,
        suppressSizeToFit: true,
        cellClassRules: deepScheme,
        menuTabs: [],
      });
    });
  }

  populateLab(user: User, lab: string) {
    let row = {
      user: user.name,
      github: user.nickname,
    };
    row[`${lab}`] = 1;
    this.rowData.push(row);
  }

  updateLab(lab: string, rowNode) {
    let val = rowNode.data[lab];
    if (val) {
      val++;
    } else {
      val = 1;
    }
    rowNode.setDataValue(lab, val);
  }

  populateTopic(user: User, topicTitle: string) {
    let row = {
      user: user.name,
      github: user.nickname,
    };
    row["topic"] = topicTitle;
    this.rowData.push(row);
  }

  updateTopic(topicTitle: string, rowNode) {
    //let val = rowNode.data['topic'];
    rowNode.setDataValue("topic", topicTitle);
  }
}
