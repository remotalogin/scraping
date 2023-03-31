import React, { Component } from "react";
import { Layout, Row, Col, Dropdown, Badge } from "antd";
import type { MenuProps } from "antd";
import { Link } from "react-router-dom";

import history from "../../history";
import { AuthService, ApiService, ApiNotificationsListRequest, Notification } from "../../services";
import { UserContext, UserContextProps } from "../../context";

import User from "../../assets/icons/user.svg";
import Message from "../../assets/icons/notification.svg";
import ArrowDown from "../../assets/icons/arrowDown.svg";
import Dashboard from "../../assets/icons/dashboard.svg";
import Settings from "../../assets/icons/setting.svg";
import Logout from "../../assets/icons/logout.svg";
import Circle from "../../assets/icons/ellipse.svg";
import userDropdownSidenavItems from "ExternalComponents/DropdownComponent";

const { Header, Content } = Layout;
type MenuItem = Required<MenuProps>["items"][number];

interface HeaderState {
    notifications: Notification[];
    loaded: boolean;
    path: string;
    news: boolean;
}

export class CustomHeader extends Component<unknown, HeaderState> {
    state: HeaderState = {
        notifications: [],
        loaded: false,
        path: "",
        news: true,
    };

    async componentDidMount() {
        userDropdownSidenavItems.forEach((element: MenuItem) => {
            this.itemsUser?.push(element);
        });
        const key_logout = this.itemsUser?.length;
        this.itemsUser?.push({
            key: `${key_logout && key_logout + 1}`,
            label: (
                <Content className="stroke-black hover:stroke-estela hover:bg-button-hover rounded">
                    <Link to={""} className="flex items-center hover:text-estela-blue-full" onClick={this.logout}>
                        <Logout className="mx-1 w-6 h-6" />
                        Logout
                    </Link>
                </Content>
            ),
            style: { backgroundColor: "white" },
        });
        this.getNotifications();
        this.setState({ path: document.location.pathname });
    }

    apiService = ApiService();
    static contextType = UserContext;

    getNotifications = async (): Promise<void> => {
        const requestParams: ApiNotificationsListRequest = {
            pageSize: 3,
        };
        this.apiService.apiNotificationsList(requestParams).then((response) => {
            if (response.results[0].seen && response.results[1].seen && response.results[2].seen) {
                this.setState({ news: false });
            }
            this.setState({ notifications: response.results, loaded: true });
        });
    };

    isLogged = (): boolean => {
        return Boolean(AuthService.getAuthToken());
    };

    getUser = (): string => {
        const { username } = this.context as UserContextProps;
        return username;
    };

    getUserRole = (): string => {
        const { role } = this.context as UserContextProps;
        return role ?? "";
    };

    logout = (): void => {
        AuthService.removeAuthToken();
        AuthService.removeUserUsername();
        AuthService.removeUserEmail();
        AuthService.removeUserRole();
        const { updateUsername, updateAccessToken, updateEmail, updateRole } = this.context as UserContextProps;
        updateUsername("");
        updateEmail("");
        updateRole && updateRole("");
        updateAccessToken("");
        history.push("/login");
    };

    itemsUser: MenuProps["items"] = [
        {
            key: "1",
            label: (
                <Content className="stroke-black hover:stroke-estela hover:bg-button-hover rounded">
                    <Link
                        to={""}
                        onClick={() => {
                            const { updateRole } = this.context as UserContextProps;
                            updateRole && updateRole("");
                        }}
                        className="flex items-center hover:text-estela-blue-full"
                    >
                        <Dashboard className="mx-1 w-6 h-6" />
                        Home
                    </Link>
                </Content>
            ),
            style: { backgroundColor: "white" },
        },
        {
            key: "2",
            label: (
                <Content className="stroke-black hover:stroke-estela-blue-full hover:bg-button-hover rounded">
                    <Link
                        to={"/settings/profile"}
                        onClick={() => {
                            const { updateRole } = this.context as UserContextProps;
                            updateRole && updateRole("");
                        }}
                        className="flex items-center hover:text-estela-blue-full"
                    >
                        <Settings className="mx-1 w-6 h-6" />
                        Account Settings
                    </Link>
                </Content>
            ),
            style: { backgroundColor: "white" },
        },
    ];

    notificationItems = (): MenuProps["items"] => [
        {
            key: "1",
            label: (
                <Content className="w-[360px] mt-1">
                    {this.state.notifications.map((notification) => (
                        <div
                            onClick={() => {
                                history.push("/notifications/inbox");
                            }}
                            className="py-2 px-3 flex hover:bg-estela-blue-low hover:text-estela-blue-full rounded-md"
                            key={notification.nid}
                        >
                            {!notification.seen ? (
                                <Badge count={<Circle className="fill-estela-blue-full h-2 mr-2 my-1" />}></Badge>
                            ) : (
                                <Badge count={<Circle className="fill-estela-blue-low h-2 mr-2 my-1" />}></Badge>
                            )}
                            <div>
                                <span className="font-semibold text-sm capitalize">
                                    {notification.user.email == AuthService.getUserEmail()
                                        ? "You"
                                        : notification.user.username}
                                </span>
                                {AuthService.getUserEmail() == notification.user.email ? " have " : " has "}
                                {notification.message}
                                <p className="text-xs text-estela-black-low">
                                    {notification.createdAt?.toDateString()}
                                </p>
                            </div>
                        </div>
                    ))}
                </Content>
            ),
            style: { backgroundColor: "white" },
        },
        {
            key: "2",
            label: (
                <Content>
                    <Link
                        className="text-estela-blue-full h-8 items-center text-center rounded-md hover:text-estela-blue-full hover:bg-estela-blue-low font-semibold flex justify-center"
                        to={"/notifications/inbox"}
                    >
                        See all
                    </Link>
                </Content>
            ),
            style: { backgroundColor: "white" },
        },
    ];

    render(): JSX.Element {
        const { loaded, path, news } = this.state;
        return (
            <>
                {loaded && (
                    <Header className="bg-white h-[72px]">
                        <Row justify="center" align="middle" className="flex justify-center">
                            <Col flex={1} className="my-1">
                                <Link to="/" className="text-xl hover:text-estela">
                                    estela
                                </Link>
                            </Col>
                            <Col flex={0.06}>
                                <Dropdown menu={{ items: this.notificationItems() }} trigger={["click"]}>
                                    {path === "/notifications/inbox" ? (
                                        <a className="flex justify-center items-center border-estela stroke-estela rounded-lg bg-estela-blue-low w-12 h-12">
                                            <Message className="w-6 h-6" />
                                        </a>
                                    ) : (
                                        <a className="flex justify-center items-center hover:stroke-estela stroke-black hover:bg-button-hover rounded-lg w-12 h-12">
                                            <Badge
                                                offset={[0, 2]}
                                                count={
                                                    news ? (
                                                        <Circle className="fill-estela-red-full stroke-estela-red-full h-2" />
                                                    ) : null
                                                }
                                            >
                                                <Message className="w-6 h-6" />
                                            </Badge>
                                        </a>
                                    )}
                                </Dropdown>
                            </Col>
                            <Col>
                                <Dropdown menu={{ items: this.itemsUser }} trigger={["click"]}>
                                    <a className="flex items-center px-2 hover:bg-estela-blue-low hover:text-estela-blue-full text-estela-blue-full rounded-lg">
                                        <Row className="flex grid-cols-3 justify-center gap-3">
                                            <Col className="my-5">
                                                <User className="stroke-estela h-6 w-6" />
                                            </Col>
                                            <Row className="grid grid-cols-1 my-3" align="middle">
                                                <Col className="font-medium text-sm h-6">{this.getUser()}</Col>
                                                {this.getUserRole() && (
                                                    <p className="text-estela-black-medium capitalize text-xs h-4">
                                                        {this.getUserRole()}
                                                    </p>
                                                )}
                                            </Row>
                                            <Col className="my-5">
                                                <ArrowDown className="stroke-estela h-5 w-5" />
                                            </Col>
                                        </Row>
                                    </a>
                                </Dropdown>
                            </Col>
                        </Row>
                    </Header>
                )}
            </>
        );
    }
}
