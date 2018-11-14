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
                title: '交易时间',
                dataIndex: 'outTransTime',
                key: 'outTransTime',
                width: 150,
            },
            {
                title: '商户订单号',
                dataIndex: 'instructId',
                key: 'instructId',
                width: 150,
            },
            {
                title: '第三方订单号',
                dataIndex: 'outOrderId',
                key: 'outOrderId',
                width: 250,
            },
            {
                title: '总金额',
                dataIndex: 'bizAmt',
                key: 'bizAmt',
                width: 100,
            },
            {
                title: '手续费',
                dataIndex: 'commissionFeeAmt',
                key: 'commissionFeeAmt',
                width: 100,
            },
            {
                title: '摘要',
                dataIndex: 'productInfo',
                key: 'productInfo',
                width: 100,
            },
            {
                title: '交易类型',
                dataIndex: 'checkType',
                key: 'checkType',
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
        if (nextProps.dataSource !== this.props.dataSource)
            this.setState({
                dataSource: nextProps.dataSource
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
                page: 1,
            });
        } else {
            this.setState({
                dataSource: [],
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
                            dataSource={detail.list}
                            loading={loading}
                            columns={this.columns()}
                            pagination={{
                                pageSize: detail.pageSize,
                                current: detail.page,
                                total: detail.total
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





