import React from 'react';
import MainLayout from '../../layouts/MainLayout/index.jsx';
import { Col, DatePicker, Row, Select } from 'antd';
import {
  GroupOutlined,
  InsertRowLeftOutlined,
  ShoppingCartOutlined,
  TeamOutlined,
  UserOutlined,
} from '@ant-design/icons';
import Chart from 'react-apexcharts';
import Handle from './handle.js';
import { formatLocalDateTime, formatMoney, formatNumber, hasPermission } from '../../utils/helper.js';
import './styles.scss';
import styles from './styles.module.scss';
import InlineSVG from 'react-inlinesvg';
import IconRevenue from '../../assets/images/icons/light/revenue-regular.svg';
import { PERMISSIONS } from '@/utils/constants.js';
import ImageForbidden from '@/assets/images/error/forbidden.png';

function Home() {
  const { typeRevenue, handleChangeTypeRevenue, revenueDateFilter, onChangeDateRevenue, overview, stateRevenue } =
    Handle();
  return (
    <MainLayout>
      {hasPermission([PERMISSIONS.LIST.LIST_ADMIN]) ? (
        <>
          <Row gutter={{ md: 0, lg: 20 }}>
            <Col span={12} lg={6}>
              <div className="flex justify-between px-5 shadow-xl h-32 items-center rounded-md overview-wrap bg-[#9fd7f9]">
                <div className="bg-[#137bf8] w-8 h-8 rounded-[10%] grid place-items-center icon-overview text-white text-xl">
                  <GroupOutlined />
                </div>
                <div className="text-right mr-4">
                  <div className="font-bold text-[#5A5A60] text-3xl text-overview">
                    {overview?.total_course ? formatNumber(overview.total_course) : 0}
                  </div>
                  <div>Khóa thể thao</div>
                </div>
                <div className="bg-[#137bf8] w-8 h-8 rounded-[10%] grid place-items-center icon-overview text-white text-xl">
                  <InsertRowLeftOutlined />
                </div>
                <div className="text-right">
                  <div className="font-bold text-[#5A5A60] text-3xl text-overview">
                    {overview?.total_class ? formatNumber(overview.total_class) : 0}
                  </div>
                  <div>Lớp thể thao</div>
                </div>
              </div>
            </Col>
            <Col span={12} lg={6} className={styles.overviewWrap}>
              <div className="flex justify-between px-5 shadow-xl h-32 items-center rounded-md overview-wrap bg-[#6ec2f7]">
                <div className="bg-[#137bf8] w-8 h-8 rounded-[10%] grid place-items-center icon-overview text-white text-xl">
                  <UserOutlined />
                </div>
                <div className="text-right mr-4">
                  <div className="font-bold text-[#5A5A60] text-3xl text-overview">
                    {overview?.total_customer ? formatNumber(overview.total_customer) : 0}
                  </div>
                  <div>Hội viên</div>
                </div>
                <div className="bg-[#137bf8] w-8 h-8 rounded-[10%] grid place-items-center icon-overview text-white text-xl">
                  <UserOutlined />
                </div>
                <div className="text-right">
                  <div className="font-bold text-[#5A5A60] text-3xl text-overview">
                    {overview?.total_teacher ? formatNumber(overview.total_teacher) : 0}
                  </div>
                  <div> Huấn luyện viên</div>
                </div>
              </div>
            </Col>
            <Col span={12} lg={6}>
              <div className="flex justify-between px-5 shadow-xl h-32 items-center rounded-md overview-wrap bg-[#3eaef4]">
                <div className="bg-[#137bf8] w-8 h-8 rounded-[10%] grid place-items-center icon-overview text-white text-xl">
                  <TeamOutlined />
                </div>
                <div className="text-right mr-4">
                  <div className="font-bold text-[#5A5A60] text-3xl text-overview">
                    {overview?.total_admin ? formatNumber(overview.total_admin) : 0}
                  </div>
                  <div>Quản trị viên</div>
                </div>
                <div className="bg-[#137bf8] w-8 h-8 rounded-[10%] grid place-items-center icon-overview text-white text-xl">
                  <ShoppingCartOutlined />
                </div>
                <div className="text-right">
                  <div className="font-bold text-[#5A5A60] text-3xl text-overview">
                    {overview?.total_order ? formatNumber(overview.total_order) : 0}
                  </div>
                  <div>Giao dịch</div>
                </div>
              </div>
            </Col>
            <Col span={12} lg={6} className={styles.overviewWrap}>
              <div className="flex justify-between px-5 shadow-xl h-32 items-center rounded-md overview-wrap bg-[#238aca]">
                <div className="bg-[#e6e22f] w-14 h-14 rounded-[10%] grid place-items-center text-white text-xl font-medium icon-overview">
                  <InlineSVG src={IconRevenue} className={`${styles.iconRevenue}`} />
                </div>
                <div className="text-right">
                  <div className="font-bold text-[#fffc2f] text-3xl text-overview">
                    {overview?.total_revenue ? formatMoney(overview.total_revenue) : 0}
                  </div>
                  <div className='text-white'>Tổng doanh thu</div>
                </div>
              </div>
            </Col>
          </Row>
          <Row className="mt-7" gutter={20}>
            <Col span={24} lg={24}>
              <div className={`text-center bg-white shadow-xl pl-5 pr-6 rounded-md ${styles.chartWrap}`}>
                <div className="h-[calc(100vh-450px)]">
                  <Chart
                    options={stateRevenue.options}
                    series={stateRevenue.series}
                    type="bar"
                    width="100%"
                    height="100%"
                  />
                </div>

                <div className="flex flex-wrap items-center justify-center mt-4">
                  <span>Thống kê theo: </span>
                  <div className="flex">
                    <Select
                      value={typeRevenue}
                      className="main-select ml-3"
                      onChange={handleChangeTypeRevenue}
                      options={[
                        { value: 'daily', label: 'Ngày' },
                        { value: 'monthly', label: 'Tháng' },
                        { value: 'yearly', label: 'Năm' },
                      ]}
                    />
                    {typeRevenue === 'daily' && (
                      <DatePicker.RangePicker
                        placeholder={['Ngày bắt đầu', 'Ngày kết thúc']}
                        value={[
                          revenueDateFilter.start_time ? revenueDateFilter.start_time : null,
                          revenueDateFilter.end_time ? revenueDateFilter.end_time : null,
                        ]}
                        locale={formatLocalDateTime}
                        format="DD-MM-YYYY"
                        className={`main-input main-datepicker datepicker-search ml-3 max-w-sm`}
                        popupClassName={`datepicker-popup`}
                        onChange={onChangeDateRevenue}
                      />
                    )}
                    {typeRevenue === 'monthly' && (
                      <DatePicker.RangePicker
                        picker="month"
                        placeholder={['Tháng bắt đầu', 'Tháng kết thúc']}
                        value={revenueDateFilter.month}
                        onChange={onChangeDateRevenue}
                        locale={formatLocalDateTime}
                        popupClassName={`datepicker-popup`}
                        format="MM-YYYY"
                        className={`main-input main-datepicker datepicker-search ml-3 max-w-sm`}
                      />
                    )}
                    {typeRevenue === 'yearly' && (
                      <DatePicker.RangePicker
                        picker="year"
                        placeholder={['Năm bắt đầu', 'Năm kết thúc']}
                        value={revenueDateFilter.year}
                        onChange={onChangeDateRevenue}
                        className={`main-input main-datepicker ml-3 max-w-sm`}
                      />
                    )}
                  </div>
                </div>
              </div>
            </Col>
          </Row>
        </>
      ) : (
        <div className="flex justify-center items-center h-[calc(100vh_-_180px)] bg-white">
          <div className="text-center">
            <img src={ImageForbidden} alt="img-err" />
            <p className="text-[#8827a0] font-semibold m-5">Bạn không có quyền truy cập!</p>
          </div>
        </div>
      )}
    </MainLayout>
  );
}

export default Home;
