import React from 'react';
import MainLayout from '../../layouts/MainLayout/index.jsx';
import styles from './styles.module.scss';
import { useNavigate } from 'react-router-dom';
import iconBuilding from '@/assets/images/icons/duotone/building.svg';
import iconContact from '@/assets/images/icons/duotone/contact.svg';
import iconReview from '@/assets/images/icons/duotone/customer-review.svg';
import InlineSVG from 'react-inlinesvg';
import { hasPermission } from '@/utils/helper.js';
import { PERMISSIONS } from '@/utils/constants.js';
import { Col, Row } from 'antd';

export default function GeneralConfiguration() {
  const navigate = useNavigate();

  return (
    <MainLayout>
      <div className={styles.generalConfigurationWrap}>
        <div className={styles.general}>
          <Row gutter={[40, 25]}>
            <Col span={8}>
              {hasPermission([
                PERMISSIONS.LIST.LIST_CONFIG_BANK,
                PERMISSIONS.LIST.LIST_CONFIG_CONTACT,
                PERMISSIONS.LIST.LIST_CONFIG_FEEDBACK,
              ]) && (
                <div className="card" onClick={() => navigate('link')}>
                  <div className="card-content">
                    <div className="card-icon">
                      <InlineSVG className="svg" src={iconBuilding} />
                    </div>
                    <p className="card-name">Cấu hình Ngân Hàng</p>
                  </div>
                </div>
              )}
            </Col>
            <Col span={8}>
              {hasPermission([PERMISSIONS.LIST.LIST_CONFIG_CONTACT]) && (
                <div className="card" onClick={() => navigate('contact')}>
                  <div className="card-content">
                    <div className="card-icon">
                      <InlineSVG className="svg" src={iconContact} />
                    </div>
                    <p className="card-name">Cấu hình Liên hệ </p>
                  </div>
                </div>
              )}
            </Col>
            <Col span={8}>
              {hasPermission([PERMISSIONS.LIST.LIST_CONFIG_FEEDBACK]) && (
                <div className="card" onClick={() => navigate('user-feedback')}>
                  <div className="card-content">
                    <div className="card-icon">
                      <InlineSVG className="svg" src={iconReview} />
                    </div>
                    <p className="card-name">Cấu hình Nhận xét</p>
                  </div>
                </div>
              )}
            </Col>
          </Row>
        </div>
      </div>
    </MainLayout>
  );
}
