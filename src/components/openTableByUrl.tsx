import { useParams } from "react-router-dom";
import Table from "./table";


export const OpenTable: React.FC = () => {
    // Obtiene los parámetros de la ruta
    const { project, collection } = useParams<{ project: string; collection: string }>();

    return <Table project={project!} collection={collection!}></Table>
}