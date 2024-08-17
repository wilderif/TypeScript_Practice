class Department {
  // private readonly id: string;
  // private name: string;
  protected employees: string[] = [];

  constructor(private readonly id: string, public name: string) {
    // this.id = id;
    // this.name = name;
  }

  describe(this: Department) {
    console.log(`Department (${this.id}): ${this.name}`);
  }

  addEmployee(employee: string) {
    this.employees.push(employee);
  }

  printEmployeeInformation() {
    console.log(this.employees.length);
    console.log(this.employees);
  }
}

class ITDepartment extends Department {
  admins: string[];
  constructor(id: string, admins: string[]) {
    super(id, "IT");
    this.admins = admins;
  }
}

class AccountingDepartment extends Department {
  private lastReport: string;

  get mostRecentReport() {
    if (this.lastReport) {
      return this.lastReport;
    }
    throw new Error("No report found.");
  }

  set mostRecentReport(value: string) {
    if (!value) {
      throw new Error("Please pass in a valid value!");
    }
    this.addReport(value);
  }

  constructor(id: string, private reports: string[]) {
    super(id, "Accounting");
    this.reports = reports;
    this.lastReport = reports[0];
  }

  addEmployee(name: string) {
    if (name === "Max") {
      return;
    }
    this.employees.push(name);
  }

  addReport(text: string) {
    this.reports.push(text);
    this.lastReport = text;
  }

  printReports() {
    console.log(this.reports);
  }
}

const accounting = new Department("d1", "Accounting");
accounting.addEmployee("Max");
accounting.addEmployee("Manu");
// accounting.employees[2] = "Anna";
accounting.describe();
accounting.printEmployeeInformation();
console.log(accounting);

// const accountingCopy = { describe: accounting.describe, name: "DUMMY" };
// accountingCopy.describe();

const it = new ITDepartment("d2", ["Max"]);
it.addEmployee("Max");
it.addEmployee("Manu");
it.describe();
console.log(it);

const accounting2 = new AccountingDepartment("d3", []);
// console.log(accounting2.mostRecentReport);
// accounting2.mostRecentReport = "";
accounting2.mostRecentReport = "Year End Report";
accounting2.addReport("Something went wrong...");
console.log(accounting2.mostRecentReport);
accounting2.printReports();
accounting2.addEmployee("Max");
accounting2.addEmployee("Manu");
console.log(accounting2);
