/**
 * export.js
 * @description
 */

const excel = require("exceljs");
const sequelizeTwo = require("../../config/dbConnectionTwo");
const Sales_order_item = require("../../model/sales_order_item");
const { Op } = require('sequelize');
const dbService = require("../../utils/dbService");
const { query } = require("express");
const user = require('../../model/user');

/**
 * @description : export file.
 */

async function exportOrderItem(req, res) {

  const first = req.query.first;
  const last = req.query.last;

  // const result = await sequelizeTwo.query(
  //   `SELECT sales_order.entity_id, 
  //           sales_order_item.order_id, 
  //           sales_order_item.item_id, 
  //           sales_order_item.name, 
  //           sales_order_item.weight, 
  //           sales_order_item.price, 
  //           sales_order_item.created_at 
  //   FROM sales_order INNER JOIN sales_order_item ON sales_order.entity_id=sales_order_item.order_id 
  //   WHERE sales_order_item.created_at between :first and :last ORDER BY 3 DESC LIMIT 10`,
  //   {   
  //       type: sequelizeTwo.QueryTypes.SELECT,
  //       replacements: { first: [first] , last: [last] }, 
  //   });

  // const result = await dbService.count(Sales_order_item,'');

  const result = await Sales_order_item.findAll(
    {
      where: {
        created_at: {
          [Op.between]: [first, last],
       }
      }
    },
     {   
        type: sequelizeTwo.QueryTypes.SELECT,
        replacements: { first: [first] , last: [last] }
     }
  );
  //  console.log(result);

  const workbook = new excel.stream.xlsx.WorkbookWriter({ stream: res });
  const worksheet = workbook.addWorksheet("Sheet1");
  worksheet.columns = [
    // { header: 'Id entity', key: 'entity_id', width: 10 },
    { header: 'Id order', key: 'order_id', width: 10 },
    { header: 'Id item', key: 'item_id', width: 10 },
    { header: 'Name', key: 'name', width: 32, outlineLevel: 1 },
    { header: 'Weight', key: 'weight', width: 10 },
    { header: 'Price', key: 'price', width: 20 },
    { header: 'Date', key: 'created_at', width: 20 },
  ];
  result.forEach((results) => {
    worksheet.addRow(results);
  });
  worksheet.commit();
  workbook.commit().then(function () {
    console.log("file is export.");
  });

  return res.writeHead(200, {
    "Content-Disposition": 'attachment; filename="file_'+ Math.round(Math.random() * 9999) +'.xlsx"',
    "Content-Type":
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
  });
}

module.exports = { exportOrderItem };
