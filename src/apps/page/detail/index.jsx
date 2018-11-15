/**
 * Created by dady on 2017/12/15.
 */

import React, {Component} from 'react';
import {withRouter} from "react-router-dom";
import * as actionTypes from "../../../config/actionTypes";
import {connect} from "react-redux";

import styles from './index.less';
import {Table, Input} from 'antd';
import {DatePicker} from 'antd';

const {RangePicker} = DatePicker;
import locale from 'antd/lib/date-picker/locale/zh_CN';
import moment from 'moment'
import 'moment/locale/zh-cn'

const Search = Input.Search;


// const startDateInit = moment().format('YYYYMM01');
// const endDateInit = moment().format('YYYYMMDD');


const defaultState = {
    pagination: {},
    startDate: '',
    endDate: '',
};
const dateFormat = 'YYYY-MM-DD';

class Detail extends Component {

    columns() {
        let array = [
            {
                title: '订单号',
                dataIndex: 'orderId',
                key: 'orderId',
                width: 150,
            },{
                title: '乘车人',
                dataIndex: 'userName',
                key: 'userName',
                width: 150,
            },{
                title: '手机号',
                dataIndex: 'phone',
                key: 'phone',
                width: 150,
            },
            {
                title: '车型',
                dataIndex: 'carLevel',
                key: 'carLevel',
                width: 150,
            },
            {
                title: '下单时间',
                dataIndex: 'orderTime',
                key: 'orderTime',
                width: 250,
            },
            {
                title: '结束时间',
                dataIndex: 'finishTime',
                key: 'finishTime',
                width: 100,
            },
            {
                title: '始发地',
                dataIndex: 'startName',
                key: 'startName',
                width: 100,
            },
            {
                title: '目的地',
                dataIndex: 'endName',
                key: 'endName',
                width: 100,
            },
            {
                title: '支付金额',
                dataIndex: 'totalPrice',
                key: 'totalPrice',
                width: 100,
            },
            {
                title: '订单状态',
                dataIndex: 'didStatusDesc',
                key: 'didStatusDesc',
                width: 100,
            },
              {
                title: '支付状态',
                dataIndex: 'payStatusDesc',
                key: 'payStatusDesc',
                width: 100,
              }
        ];
        return array
    }

    constructor(props) {
        super(props);
        this.state = {...defaultState};
        this.onChange = this.onChange.bind(this);
        this.handleTableChange = this.handleTableChange.bind(this);

    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.detail !== this.props.detail)
            this.setState({
                detail: nextProps.detail
            });
    }

    onChange(date, dateString) {
        this.setState({
            startDate: dateString[0],
            endDate: dateString[1],
        });
        if (dateString[0] !== '' && dateString[1] !== '') {
            this.props.fetchDetail({
                startDate: dateString[0],
                endDate: dateString[1],
                page: 0,
            });
        } else {
            this.setState({
                detail: [],
            });
        }

    }


    handleTableChange(pagination) {
        const pager = {...this.state.pagination};
        pager.current = pagination.current;
        this.setState({
            pagination: pager,
        });
        this.props.fetchDetail({
            startDate: this.state.startDate,
            endDate: this.state.endDate,
            page: pager.current,

        });
    }


    componentDidMount() {
    }

    render() {
        const {detail, loading} = this.state;
        console.log(detail)
        return (
            <div className="detail">
                <div className="find">
                    <div className="bank">
                        <RangePicker
                            onChange={this.onChange}
                            locale={locale}
                            format={dateFormat}
                        />
                    </div>
                </div>

                {
                  detail ?
                        <Table
                            dataSource={detail.content}
                            loading={loading}
                            columns={this.columns()}
                            pagination={{
                                pageSize: detail.size,
                                current: detail.number,
                                total: detail.totalElements
                            }}
                            scroll={{y: 640}}
                            onChange={this.handleTableChange}
                            locale={{emptyText: '暂无数据'}}
                        /> :
                        <Table
                            dataSource={null}
                            loading={loading}
                            columns={this.columns()}
                            scroll={{y: 640}}
                            locale={{emptyText: '暂无数据'}}
                        />
                }
            </div>
        );
    }
}

const mapStateToProps = state => {
    return ({
      detail: state.detail.data,
    })
};


const mapDispatchToProps = dispatch => ({
    fetchDetail: (payload) => dispatch({
        type: actionTypes.FETCH_DETAIL,
        payload
    }),

});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Detail));





