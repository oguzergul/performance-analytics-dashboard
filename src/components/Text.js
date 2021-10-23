import React from 'react';

const Text = ({tag, children, type}) => {
    const CustomText = `${tag}`;


    const textStyle = (type = 'regular') => {
        return (
            {
                title: 'text-3xl font-bold',
                label: 'mb-3',
                cardTitle: "text-center font-semibold",
            }[type] || 'regular'
        )
    }

    return (
        <CustomText className={textStyle(type)}>{children}</CustomText>
    );
}

export default Text;