import React from 'react';
import type { Unit } from '../helpers/dataTypes';

interface ListComponentProps {
  units: Unit[];
}

const ListComponent: React.FC<ListComponentProps> = ({ units }) => {
  return (
    <div className="list-component">
        <table>
          <thead>
            <tr>
              <th>Unit Name</th>
              <th>Type</th>
              <th>Codex Page</th>
              <th>Points Cost</th>
              <th>Built</th>
              <th>Painted</th>
            </tr>
          </thead>
          <tbody>
              {units && units.length > 0 ? (
                units.map((unit, id) => (
                  <tr key={id}>
                    <td>{unit.unitName}</td>
                    <td>{unit.unitType}</td>
                    <td>{unit.codexPage}</td>
                    <td>{unit.pointsCost}</td>
                  <td>{unit.isBuilt ? 'Yes' : 'No'}</td>
                  <td>{unit.isPainted ? 'Yes' : 'No'}</td>
                </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={6}>No unit data available.</td>
                </tr>
            )}
          </tbody>
        </table>
    </div>
  );
}

export default ListComponent;
