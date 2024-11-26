import React, { FC, useState } from "react";
import "./DisclaimerSection.css";

import Modal from "./Modal";
import DisclaimerScreen from "../../screen/DisclaimerScreen";

const DisclaimerSection: FC = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const openModal = () => setIsModalOpen(true);
    const closeModal = () => setIsModalOpen(false);

    return (
        <div id="disclaimer">
            <div className="inline-container">
                <div className="disclaimer-text">
                    AI-generated content can make mistakes. By using this
                    application, you agree to our{" "}
                    <a id="disclaimer-link" onClick={openModal}>
                        disclaimer
                    </a>
                </div>
            </div>

            {/* Modal with DisclaimerScreen */}
            <Modal isOpen={isModalOpen} onClose={closeModal}>
                <DisclaimerScreen />
            </Modal>
        </div>
    );
};

export default DisclaimerSection;
