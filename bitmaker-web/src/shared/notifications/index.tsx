import { notification } from "antd";

import "./styles.scss";
import history from "../../history";

export const authNotification = (): void => {
    notification.warn({
        message: "Authenticated Resource",
        description: "You need to be logged to enter to this resource.",
    });
    history.push("/login");
};

export const resourceNotAllowedNotification = (): void => {
    notification.error({
        message: "Resource Not Allowed",
        description: "You do not have permissions to enter to this resource.",
    });
    history.push("/");
};

export const incorrectCredentialsNotification = (): void => {
    notification.error({
        message: "Incorrect Credentials",
        description: "Credentials do not match.",
    });
};

export const incorrectDataNotification = (): void => {
    notification.error({
        message: "Incorrect Data or Insufficient permissions.",
        description: "Check form fields, data and permissions.",
    });
};

export const insecurePasswordNotification = (message: string): void => {
    notification.warn({
        message: "Insecure Password",
        description: message,
    });
};

export const invalidDataNotification = (message: string): void => {
    notification.error({
        message: "Invalid Data",
        description: message,
    });
};

export const nonExistentUserNotification = (): void => {
    notification.warn({
        message: "Invalid Data",
        description: `User does not exist.`,
    });
};

export const emailConfirmationNotification = (): void => {
    notification.open({
        message: "Confirmation email sent",
        description: `The confirmation email was sent to the email you provided.`,
    });
};
