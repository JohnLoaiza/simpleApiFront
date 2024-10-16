// components/ModuleContent.tsx
import React from 'react';
import Table from './table';

interface ModuleContentProps {
    module: string;
    setEditModal: any
}

const ModuleContent = ({ module, setEditModal }: ModuleContentProps) => {
    const renderModuleContent = () => {
        switch (module) {
            case 'Home':
                return <div>Welcome to the Home module! Here you can see a dashboard overview.</div>;
            default:
                return <Table project={'programacionSoftware'} collection={module} setEditModal={setEditModal}></Table>;

        }
    };

    return (
        <div>
            {renderModuleContent()}
        </div>
    );
};

export default ModuleContent;
