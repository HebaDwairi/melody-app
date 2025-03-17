import { useReactTable, getCoreRowModel, getPaginationRowModel, flexRender } from '@tanstack/react-table';
import { useState } from 'react';
import { Fragment } from 'react';

const DataTable = ({ data }) => {
  const [expandedRow, setExpandedRow] = useState(null);
  
  const columns = [
    {
      header: '#',
      cell: ({ row }) => (row.index + 1)
    },
    {
      accessorKey: 'scale',
      header: 'Scale',
    },
    {
      accessorKey: 'result',
      header: 'Result',
    },
    {
      accessorKey: 'accuracy',
      header: 'Accuracy',
    },
    {
      accessorKey: 'correct',
      header: 'Correct?',
      cell: ({getValue}) => (getValue() ? 'Yes' : 'No'),
    },
    {
      accessorKey: 'createdAt',
      header: 'Date',
      cell: ({getValue}) => (new Date(getValue()).toLocaleString())
    },
    {
      accessorKey: 'details',
      header: 'Details',
      cell: ({row}) => (
        <button className='btn'
          onClick={() => {setExpandedRow(row.id === expandedRow ? null : row.id)}}
        >
          {expandedRow === row.id ? 'Hide' : 'Show'}
        </button>
      ),
    }
  ];

  const table = useReactTable({
    data: data,
    columns: columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    initialState: {
      pagination: {
        pageSize: 10,
      },
    },
  });

  return (
    <>
      <table className='w-full border-2 '>
        <thead>
          {
            table.getHeaderGroups().map(headerGroup => (
              <tr key={headerGroup.id}>
                {
                  headerGroup.headers.map(header => (
                    <th key={header.id}>
                      {
                        flexRender(header.column.columnDef.header, header.getContext())
                      }
                    </th>
                  ))}
              </tr>
          ))}
        </thead>
        <tbody>
          {
            table.getRowModel().rows.map(row => (
              <Fragment key={row.id}>
                <tr key={row.id}>
                  {
                    row.getVisibleCells().map(cell => (
                      <td key={cell.id} className='border'>
                        {
                          flexRender(cell.column.columnDef.cell, cell.getContext())
                        }
                      </td>
                    ))
                  }
                </tr>
                {expandedRow === row.id && (
                  <tr>
                    <td colSpan={columns.length} className="border p-2 bg-gray-100">
                      <strong>User Notes:</strong> {row.original.userNotes.join(', ')}
                      <br />
                      <strong>Correct Notes:</strong> {row.original.notes.join(', ')}
                    </td>
                  </tr>
                )}
              </Fragment>
            ))
          }
        </tbody>
      </table>
      <div>
        <div>
          <span>
            Page {table.getState().pagination.pageIndex + 1}
          </span>
        </div>
        <div>
          <button
            onClick={() => {table.previousPage()}}
            disabled={!table.getCanPreviousPage()}
          >
            previous
          </button>
          <button
            onClick={() => {table.nextPage()}}
            disabled={!table.getCanNextPage()}
          >
            next
          </button>
        </div>
      </div>
    </>
  );
}


export default DataTable;