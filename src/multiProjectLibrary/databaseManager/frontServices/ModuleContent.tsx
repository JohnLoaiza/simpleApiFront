// components/ModuleContent.tsx
import {sesionTime } from '../../../configs';
import CountdownTimer from '../../../components/viewSesionTime';
import Table from './tableView';
import { Admin } from '../../projectsManager';
import { User } from './dashboard';
import { Module } from '../../projectsManager/models/moduleModel';

interface ModuleContentProps {
    module: Module;
    setEditModal: any
    userSettings: User
}

const ModuleContent = ({ module, setEditModal, userSettings }: ModuleContentProps) => {

    const rolColor = (rol: string)=> {
        switch(rol) {
            case 'Admin':
                return '#1abc9c';
            case 'Profesor':
                return '#1a63bc';
            case 'Estudiante':
                return '#9aa738';
            default:
                return '#E1A6A2FF';
        }
    }

    const renderModuleContent = () => {
        switch (module.name.toUpperCase()) {
                case 'HOME':
                    return <div>Tus roles activos son
                    {userSettings.roles.map(r => r.name).map((r)=> <>
                    <div>{r} 
                        <div style={{backgroundColor: rolColor(r), height: '20px', width: '20px', borderRadius: '10px'}}></div>
                    </div>
                    </>) }
                    <CountdownTimer initialTime={sesionTime}></CountdownTimer>
                    </div>;
            default:
                return <Table project={Admin.projectSelected!.props.name} collection={module.name} ></Table>;

        }
    };

    return (
        <div>
            {renderModuleContent()}
        </div>
    );
};

export default ModuleContent;
