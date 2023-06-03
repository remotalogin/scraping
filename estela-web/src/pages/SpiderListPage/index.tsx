import React, { Component, ReactElement } from "react";
import { Link } from "react-router-dom";
import { Col, Layout, Row, Button, Space, Typography, Table, Pagination } from "antd";
import Add from "../../assets/icons/add.svg";
import { RouteComponentProps } from "react-router-dom";

import "./styles.scss";
import { ApiService } from "../../services";
import { ApiProjectsSpidersListRequest, Spider } from "../../services/api";
import { resourceNotAllowedNotification, Spin, PaginationItem } from "../../shared";
import { ColumnsType } from "antd/lib/table";
import moment from "moment";

const { Content } = Layout;
const { Text } = Typography;

interface SpiderList {
    key: number;
    name: string;
    sid: number | undefined;
}

interface SpiderListPageState {
    spiders: SpiderList[];
    current: number;
    count: number;
    loaded: boolean;
    statsStartDate: moment.Moment;
    statsEndDate: moment.Moment;
}

interface RouteParams {
    projectId: string;
}

export class SpiderListPage extends Component<RouteComponentProps<RouteParams>, SpiderListPageState> {
    PAGE_SIZE = 10;
    state: SpiderListPageState = {
        spiders: [],
        count: 0,
        current: 0,
        loaded: false,
        statsStartDate: moment().subtract(7, "days").startOf("day"),
        statsEndDate: moment(),
    };
    apiService = ApiService();
    projectId: string = this.props.match.params.projectId;

    async componentDidMount(): Promise<void> {
        await this.getProjectSpiders(1);
    }

    async getProjectSpiders(page: number): Promise<void> {
        const requestParams: ApiProjectsSpidersListRequest = { pid: this.projectId, page, pageSize: this.PAGE_SIZE };
        this.apiService.apiProjectsSpidersList(requestParams).then(
            (response) => {
                const spiders: SpiderList[] = response.results.map((spider: Spider, index: number) => {
                    return {
                        key: index,
                        name: spider.name,
                        sid: spider.sid,
                    };
                });
                this.setState({ spiders: [...spiders], count: response.count, current: page, loaded: true });
            },
            (error: unknown) => {
                error;
                resourceNotAllowedNotification();
            },
        );
    }

    columns: ColumnsType<SpiderList> = [
        {
            title: "SPIDER",
            dataIndex: "name",
            key: "name",
            render: (name: string, spider: SpiderList): ReactElement => (
                <Link
                    key={spider.key}
                    to={`/projects/${this.projectId}/spiders/${spider.sid}`}
                    className="text-estela-blue-medium"
                >
                    {name}
                </Link>
            ),
        },
        {
            title: "LAST RUN",
            dataIndex: "lastRun",
            key: "lastRun",
            render: (): ReactElement => <Text className="text-estela-black-medium text-xs">Not available</Text>,
        },
        {
            title: "JOBS",
            dataIndex: "jobs",
            key: "jobs",
            render: (): ReactElement => <Text className="text-estela-black-medium text-xs">-/-</Text>,
        },
    ];

    onPageChange = async (page: number): Promise<void> => {
        this.setState({ loaded: false });
        await this.getProjectSpiders(page);
    };

    // headSection: () => JSX.Element = () => {
    //     const { statsStartDate, statsEndDate } = this.state;

    //     const onChangeDateRange: RangePickerProps["onChange"] = (_, dateStrings) => {
    //         this.setState({ loadedStats: false });
    //         this.getProjectStatsAndUpdateDates(dateStrings[0], dateStrings[1]);
    //     };

    //     return (
    //         <>
    //             <Row className="flow-root items-center justify-end space-x-4 space-x-reverse">
    //                 <RangePicker
    //                     onChange={onChangeDateRange}
    //                     defaultValue={[statsStartDate, statsEndDate]}
    //                     ranges={{
    //                         Today: [moment(), moment()],
    //                         "Last 72h": [moment().subtract(3, "days").startOf("day"), moment()],
    //                         "Last 7 Days": [moment().subtract(7, "days").startOf("day"), moment()],
    //                         "Last 14 Days": [moment().subtract(14, "days").startOf("day"), moment()],
    //                         "Last 30 Days": [moment().subtract(30, "days").startOf("day"), moment()],
    //                     }}
    //                     format="YYYY-MM-DD"
    //                     className="statDateRangePicker flex float-right w-60 items-center rounded-lg font-medium stroke-white border-estela-blue-full hover:stroke-estela bg-estela-blue-low"
    //                 />
    //                 <Button
    //                     icon={<Run className="mr-2" width={19} />}
    //                     className="flex float-right items-center rounded-3xl font-medium stroke-estela border-estela hover:stroke-estela bg-estela-blue-low text-estela hover:text-estela text-sm hover:border-estela"
    //                     onClick={() => {
    //                         this.setState({ loadedStats: false });
    //                         this.getProjectStatsAndUpdateDates();
    //                     }}
    //                 >
    //                     Refresh
    //                 </Button>
    //             </Row>
    //             <Divider className="bg-estela-black-low mb-5" />
    //             <Content className="flow-root">
    //                 <Tabs
    //                     className="float-right text-estela-black-medium text-xs md:text-sm"
    //                     defaultActiveKey={"optionTab"}
    //                     onChange={this.onStatsTabChange}
    //                     items={[
    //                         {
    //                             label: "Jobs",
    //                             key: StatType.JOBS,
    //                             children: this.chartsSection(),
    //                         },
    //                         {
    //                             label: "Pages",
    //                             key: StatType.PAGES,
    //                             children: this.chartsSection(),
    //                         },
    //                         {
    //                             label: "Items",
    //                             key: StatType.ITEMS,
    //                             children: this.chartsSection(),
    //                         },
    //                         {
    //                             label: "Runtime",
    //                             key: StatType.RUNTIME,
    //                             children: this.chartsSection(),
    //                         },
    //                         {
    //                             label: "Coverage",
    //                             key: StatType.COVERAGE,
    //                             children: this.chartsSection(),
    //                         },
    //                         {
    //                             label: "Success rate",
    //                             key: StatType.SUCCESS_RATE,
    //                             children: this.chartsSection(),
    //                         },
    //                         {
    //                             label: "Status code",
    //                             key: StatType.STATUS_CODE,
    //                             children: this.chartsSection(),
    //                         },
    //                         {
    //                             label: "Logs",
    //                             key: StatType.LOGS,
    //                             children: this.chartsSection(),
    //                         },
    //                     ]}
    //                 />
    //             </Content>
    //         </>
    //     );
    // };

    render(): JSX.Element {
        const { loaded, spiders, count, current } = this.state;
        return (
            <Content className="bg-metal rounded-2xl">
                {loaded ? (
                    <div className="lg:m-10 md:mx-6 mx-2">
                        <Row className="flow-root my-6">
                            <Col className="float-left">
                                <p className="text-xl font-medium text-silver float-left">SPIDERS</p>
                            </Col>
                            <Col className="float-right">
                                <Button
                                    icon={<Add className="mr-2" width={19} />}
                                    onClick={() => this.props.history.push(`/projects/${this.projectId}/deploys`)}
                                    size="large"
                                    className="flex items-center stroke-white border-estela hover:stroke-estela bg-estela text-white hover:text-estela text-sm hover:border-estela rounded-md"
                                >
                                    Deploy new spider
                                </Button>
                            </Col>
                        </Row>
                        <Row className="lg:mx-6 mx-4 grid grid-cols-7 gap-2 lg:gap-4 justify-between">
                            <Col className="bg-metal col-span-5">
                                <Content className="bg-white rounded-2xl py-5 pr-8 pl-5">
                                    {/* {this.headSection()} */}
                                    {/* {this.dataSection()} */}
                                </Content>
                            </Col>
                            <Col className="bg-metal grid justify-start col-span-2 gap-2">
                                {/* {this.projectUsageSection()} */}
                            </Col>
                        </Row>
                        <Row className="bg-white rounded-lg">
                            <div className="m-4">
                                <Space direction="vertical" className="">
                                    <Table
                                        tableLayout="fixed"
                                        className="rounded-2xl"
                                        columns={this.columns}
                                        dataSource={spiders}
                                        pagination={false}
                                        size="middle"
                                        locale={{ emptyText: "No spiders yet" }}
                                    />
                                </Space>
                            </div>
                        </Row>
                        <Row>
                            <Pagination
                                className="pagination"
                                defaultCurrent={1}
                                total={count}
                                current={current}
                                pageSize={this.PAGE_SIZE}
                                onChange={this.onPageChange}
                                showSizeChanger={false}
                                itemRender={PaginationItem}
                            />
                        </Row>
                    </div>
                ) : (
                    <Spin />
                )}
            </Content>
        );
    }
}