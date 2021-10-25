import React from 'react';
import classnames from "classnames";

const Text = ({tag, children, type, className}) => {
    const CustomText = `${tag}`;
    return (
        <CustomText className={
            [`${className || ""}`, classnames({
                "mb-3 text-blue-500 font-semibold": type === "label",
                "text-3xl font-bold block": type === "title",
                "text-black-400 block": type === "regular",
                "text-red-400 block": type === "danger",
                "block text-center": type === "cardTitle",
            })]
        }>{children}</CustomText>
    );
}

export default Text;