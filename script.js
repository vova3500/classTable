var a = fetch("https://back.cruiseraddiction.com/api/parts")
  .then(response => response.json())
  .then(
    json =>
      new Table({
        json,
        rowClick: item => {
          console.log(item);
        },
        selected: item => {
          console.log(item);
        },
        displayName: "name",
        displayValue: "value"
      })
  );

class Td {
  constructor(item) {
    this.item = item;
  }
  template() {
    var td = document.createElement("td");
    td.append(this.item);
    return td;
  }
}

class Tr {
  array = [];
  constructor(array) {
    this.array = array;
    this.createColums();
  }
  createColums() {
    var qwe = Object.values(this.array);
    this.array = qwe.map(item => new Td(item).template());
  }
  template(colums) {
    var tr = document.createElement("tr");
    var td = document.createElement("td");
    td.innerHTML = "&#10004;";
    tr.append(td);
    this.array.map(item => tr.append(item));
    return tr;
  }
}
class Table {
  array = [];
  arraySelected = [];
  constructor(array) {
    this.items = array.json.data;
    this.rowClick = array.rowClick;
    this.selected = array.selected;
    this.displayName = array.displayName;
    this.displayValue = array.displayValue;
    this.createRow();
    this.render();
  }

  callbackSelected(value) {
    if (typeof this.rowClick === "function") {
      this.arraySelected.push(value);
      this.selected(this.arraySelected);
    }
  }

  callbackClick(value) {
    if (typeof this.rowClick === "function") {
      this.rowClick(value);
    }
  }

  createRow() {
    this.items = this.items.map(item => new Tr(item).template());
  }

  template() {
    var table = document.createElement("table");
    this.items.map((item, index) => {
      var itemCheck = item.childNodes[0];
      itemCheck.onclick = () => {
        this.callbackSelected(itemCheck.parentElement);
      };
      table.append(item);
      item.onclick = () => {
        this.callbackClick(item);
        this.displayName = index;
        this.displayValue = item.tagName;
        this.callbackClick(this.displayName);
        this.callbackClick(this.displayValue);
      };
    });
    return table;
  }

  render() {
    document.body.append(this.template());
  }
}
