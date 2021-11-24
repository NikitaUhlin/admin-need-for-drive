import React from "react";
import { Button, Form, Select, } from "antd";

import styles from "./filter.module.less"

const { Option } = Select;

const Filter = ({ filters, onFilter, onClear }) => {
    const [form] = Form.useForm();

    const onClearFilter = () => {
        onClear()
        form.resetFields()
    }

    return (
        <Form
            name="filter_form"
            form={form}
            onFinish={onFilter}
        >
            <div className={styles.container}>
                <div className={styles.selects}>
                    {filters.map((item) => (
                        <Form.Item
                            key={item.placeholder}
                            name={item.label}
                            className={styles.item}
                        >
                            <Select
                                placeholder={item.placeholder}

                            >
                                {item.options.map((i) => (
                                    <Option
                                        key={i.id}
                                        value={i.id}
                                    >
                                        {i.name}
                                    </Option>
                                ))}
                            </Select>
                        </Form.Item>
                    ))}

                </div>
                <div className={styles.buttonContainer}>
                    <Form.Item>
                        <Button
                            type="primary"
                            danger
                            onClick={onClearFilter}
                        >
                            Отменить
                        </Button>
                    </Form.Item>
                    <Form.Item>
                        <Button
                            type="primary"
                            className={styles.button}
                            htmlType="submit"
                        >
                            Применить
                        </Button>
                    </Form.Item>
                </div>
            </div>
        </Form>
    )
}

export default Filter