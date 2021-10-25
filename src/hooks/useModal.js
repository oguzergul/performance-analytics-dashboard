import {useState} from 'react';

const useModal = () => {
    const [isVisible, setVisible] = useState(false);

    const [modalBody, setModalBody] = useState({
        title: "",
        description: ""
    });

    function toggleModel(data) {
        setVisible(!isVisible);
        if (data) {
            setBody(data)
        }
    }

    function setBody(data) {
        setModalBody(data)
    }

    return {toggleModel, isVisible, setBody, modalBody}
};

export default useModal;