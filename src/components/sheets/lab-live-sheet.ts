import type { Lo } from "../../services/course/lo";
import { LabSheet } from "./lab-sheet";
import { deepScheme } from "./heat-map-colours";
import type { User } from "../../services/analytics/metrics-types";

export class LabLiveSheet extends LabSheet {
  title = "Whos is Here?";
  subtitle = "Students doing labs right now";
  rowData = [];

  columnDefs: any = [
    { headerName: "Github Profile Name", field: "user", width: 180, suppressSizeToFit: true, pinned: "left" },
    { headerName: "Topic", field: "topic", width: 120, suppressSizeToFit: true },
  ];

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
