import React from 'react';

const Text = ({tag, children, type}) => {
    const CustomText = `${tag}`;


    const textStyle = (type = 'regular') => {
        return (
            {
                title: 'text-3xl font-bold block',
                label: 'mb-3 text-blue-500 font-semibold',
                cardTitle: "text-center font-semibold",
                regular: "text-black-400 block",
                danger: "text-red-400 block"
            }[type] || 'regular'
        )
    }

    return (
        <CustomText className={textStyle(type)}>{children}</CustomText>
    );
}

export default Text;