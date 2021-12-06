import React from "react";
import { Card, Table, Button, Spin } from "antd";
import { PlusOutlined } from '@ant-design/icons';
import { LoadingOutlined } from '@ant-design/icons'

import Layout from "../Layout/Layout"

import styles from "./entitiesList.module.less"

const EntitiesList = ({ title, columns, data, loadingData }) => (
    <Layout>
        <div className={styles.title}>{title}</div>
        {loadingData ?
            <Spin
                size="large"
                indicator={
                    <LoadingOutlined style={{ fontSize: 24 }
                    } spin />
                }
            />
            :
            <Card>
                <div className={styles.container}>
                    <div className={styles.createButton}>
                        <Button size="large"><PlusOutlined style={{ fontSize: 13 }} />Создать</Button>
                    </div>
                    <Table
                        pagination={{
                            pageSize: 11,
                            size: "small",
                            showSizeChanger: false,
                            position: ["bottomCenter"],
                            hideOnSinglePage: true
                        }}
                        columns={columns}
                        dataSource={data}
                        size="small"
                    />
                </div>
            </Card>}
    </Layout>

)

export default EntitiesList