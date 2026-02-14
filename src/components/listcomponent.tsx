import React from "react";

interface ListComponentProps {
    unitName: string;
    unitType: string;
    codexPage: string;
    pointsCost: string;
    isBuilt: string;
    isPainted: string;
}

const ListComponent: React.FC<ListComponentProps> = ({
    unitName,
    unitType,
    codexPage,
    pointsCost,
    isBuilt,
    isPainted
}) => {
    return (
        <div className="list-component">
            <h2>{unitName}</h2>
            <p>Type: {unitType}</p>
            <p>Codex Page: {codexPage}</p>
            <p>Points Cost: {pointsCost}</p>
            <p>Built: {isBuilt}</p>
            <p>Painted: {isPainted}</p>
        </div>
    );
}

export default ListComponent;
