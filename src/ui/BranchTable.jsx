
import React, { useState } from "react";
import ActionDropdown from "./ActionDropdown";

const BranchTable = ({
  data = [],
  onView,
  onEdit,
  onDelete,
  onApprove,
  containerClassName = "",
  tableClassName = "",
  headerClassName = "",
  rowClassName = "",
  customColumns = null,
}) => {
  const [dropdownOpen, setDropdownOpen] = useState(null);

  const hasActions = onView || onEdit || onDelete || onApprove;

  const dynamicKeys =
    data.length > 0
      ? Object.keys(data[0]).filter((key) => key !== "_id" && key !== "__v")
      : [];

  const columns =
    customColumns ||
    dynamicKeys.map((key) => ({
      key,
      label: key,
    }));

  return (
    <div
      className={`bg-white shadow-md rounded-lg border border-gray-200 ${containerClassName}`}
    >
      {/* Set overflow-visible here to allow dropdown overflow */}
      <div className="overflow-x-auto max-h-[70vh] w-full overflow-visible relative">
        <table
          className={`w-full table-auto border-collapse text-sm md:text-base ${tableClassName}`}
        >
          <thead className="bg-blue-900 text-white sticky top-0 z-20">
            <tr>
              <th className={`py-3 px-4 text-center ${headerClassName}`}>
                S/N
              </th>
              {columns.map((col) => (
                <th
                  key={col.key}
                  className={`py-3 px-4 text-left capitalize whitespace-nowrap ${headerClassName}`}
                >
                  {col.label}
                </th>
              ))}
              {hasActions && (
                <th
                  className={`py-3 px-4 text-center whitespace-nowrap ${headerClassName}`}
                >
                  Actions
                </th>
              )}
            </tr>
          </thead>
          <tbody>
            {data.length > 0 ? (
              data.map((row, index) => (
                <tr
                  key={row._id || index}
                  className={`even:bg-gray-50 hover:bg-blue-50 transition-colors ${rowClassName}`}
                >
                  <td className="py-2 px-4 text-center">{index + 1}</td>
                  {columns.map((col) => (
                    <td key={col.key} className="py-2 px-4 text-left">
                      {row[col.key]}
                    </td>
                  ))}
                  {hasActions && (
                    <td className="py-2 px-4 text-center relative">
                      {/* Add relative here to position dropdown absolutely inside */}
                      <ActionDropdown
                        isOpen={dropdownOpen === index}
                        setIsOpen={(isOpen) =>
                          setDropdownOpen(isOpen ? index : null)
                        }
                        item={row}
                        onView={onView}
                        onEdit={onEdit}
                        onDelete={onDelete}
                        onApprove={onApprove}
                      />
                    </td>
                  )}
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan={columns.length + (hasActions ? 2 : 1)}
                  className="py-4 text-center text-gray-500"
                >
                  No data available.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default BranchTable;


