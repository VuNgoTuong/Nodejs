/**
 * sales_order_item.js
 * @description :: sequelize model of database table sales_order_item
 */

const {
    DataTypes, Op 
  } = require('sequelize');
  const sequelizeTwo = require('../config/dbConnectionTwo');
  const sequelizePaginate = require('sequelize-paginate');
  const sequelizeTransforms = require('sequelize-transforms');
  let Sales_order_item = sequelizeTwo.define('sales_order_item',{
    item_id:{
      type:DataTypes.INTEGER,
      primaryKey:true,
      autoIncrement:true
    },
    order_id:{ 
      type:DataTypes.INTEGER,
      foreignKey:true
     },
    parent_item_id:{ type:DataTypes.INTEGER },
    quote_item_id:{ type:DataTypes.INTEGER },
    store_id:{ 
      type:DataTypes.INTEGER,
      foreignKey:true
     },
    created_at:{ type:DataTypes.DATE },
    updated_at:{ type:DataTypes.DATE },
    product_id:{ type:DataTypes.INTEGER },
    product_type:{ type:DataTypes.STRING },
    product_options:{ type:DataTypes.TEXT },
    weight:{ type:DataTypes.DECIMAL },
    is_virtual:{ type:DataTypes.SMALLINT },
    sku:{ type:DataTypes.STRING },
    name:{ type:DataTypes.STRING },
    description:{ type:DataTypes.TEXT },
    applied_rule_ids:{ type:DataTypes.TEXT },
    additional_data:{ type:DataTypes.TEXT },
    is_qty_decimal:{ type:DataTypes.SMALLINT },
    no_discount:{ type:DataTypes.SMALLINT },
    qty_backordered:{ type:DataTypes.DECIMAL },
    qty_canceled:{ type:DataTypes.DECIMAL },
    qty_invoiced:{ type:DataTypes.DECIMAL },
    qty_ordered:{ type:DataTypes.DECIMAL },
    qty_refunded:{ type:DataTypes.DECIMAL },
    qty_shipped:{ type:DataTypes.DECIMAL },
    base_cost:{ type:DataTypes.DECIMAL },
    price:{ type:DataTypes.DECIMAL },
    base_price:{ type:DataTypes.DECIMAL },
    original_price:{ type:DataTypes.DECIMAL },
    base_original_price:{ type:DataTypes.DECIMAL },
    tax_percent:{ type:DataTypes.DECIMAL },
    tax_amount:{ type:DataTypes.DECIMAL },
    base_tax_amount:{ type:DataTypes.DECIMAL },
    tax_invoiced:{ type:DataTypes.DECIMAL },
    discount_percent:{ type:DataTypes.DECIMAL },
    discount_amount:{ type:DataTypes.DECIMAL },
    base_discount_amount  :{ type:DataTypes.DECIMAL },
    discount_invoiced:{ type:DataTypes.DECIMAL },
    base_discount_invoiced:{ type:DataTypes.DECIMAL },
    amount_refunded:{ type:DataTypes.DECIMAL },
    base_amount_refunded:{ type:DataTypes.DECIMAL },
    row_total:{ type:DataTypes.DECIMAL },
    base_row_total:{ type:DataTypes.DECIMAL },
    row_invoiced:{ type:DataTypes.DECIMAL },
    base_row_invoiced:{ type:DataTypes.DECIMAL },
    row_weight:{ type:DataTypes.DECIMAL },
    base_tax_before_discount:{ type:DataTypes.DECIMAL },
    tax_before_discount:{ type:DataTypes.DECIMAL },
    ext_order_item_id:{ type:DataTypes.STRING },
    locked_do_invoice:{ type:DataTypes.SMALLINT },
    locked_do_ship:{ type:DataTypes.SMALLINT },
    price_incl_tax:{ type:DataTypes.DECIMAL },
    base_price_incl_tax:{ type:DataTypes.DECIMAL },
    row_total_incl_tax:{ type:DataTypes.DECIMAL },
    base_row_total_incl_tax:{ type:DataTypes.DECIMAL },
    discount_tax_compensation_amount:{ type:DataTypes.DECIMAL },
    base_discount_tax_compensation_amount:{ type:DataTypes.DECIMAL },
    discount_tax_compensation_invoiced:{ type:DataTypes.DECIMAL },
    base_discount_tax_compensation_invoiced:{ type:DataTypes.DECIMAL },
    discount_tax_compensation_refunded:{ type:DataTypes.DECIMAL },
    base_discount_tax_compensation_refunded:{ type:DataTypes.DECIMAL },
    tax_canceled:{ type:DataTypes.DECIMAL },
    discount_tax_compensation_canceled:{ type:DataTypes.DECIMAL },
    tax_refunded:{ type:DataTypes.DECIMAL },
    base_tax_refunded:{ type:DataTypes.DECIMAL },
    discount_refunded:{ type:DataTypes.DECIMAL },
    base_discount_refunded:{ type:DataTypes.DECIMAL },
    free_shipping:{ type:DataTypes.SMALLINT },
    gift_message_id:{ type:DataTypes.INTEGER },
    gift_message_available:{ type:DataTypes.INTEGER },
    weee_tax_applied:{ type:DataTypes.TEXT },
    weee_tax_applied_amount:{ type:DataTypes.DECIMAL },
    weee_tax_applied_row_amount:{ type:DataTypes.DECIMAL },
    weee_tax_disposition:{ type:DataTypes.DECIMAL },
    weee_tax_row_disposition:{ type:DataTypes.DECIMAL },
    base_weee_tax_applied_amount:{ type:DataTypes.DECIMAL },
    base_weee_tax_applied_row_amnt:{ type:DataTypes.DECIMAL },
    base_weee_tax_disposition:{ type:DataTypes.DECIMAL },
    base_weee_tax_row_disposition:{ type:DataTypes.DECIMAL },
    is_free_product:{ type:DataTypes.SMALLINT },
    free_by_rule_id:{ type:DataTypes.SMALLINT },
  }
  ,{
    timestamps: false,
    freezeTableName: true,
    tableName: "sales_order_item"
  }
  );
  Sales_order_item.prototype.toJSON = function () {
    let values = Object.assign({}, this.get());
    return values;
  };


  sequelizeTransforms(Sales_order_item);
  sequelizePaginate.paginate(Sales_order_item);
  module.exports = Sales_order_item;
  