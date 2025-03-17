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
      cell: ({getValue}) => {
        const options = { 
          day: "2-digit", 
          month: "short", 
          year: "numeric", 
          hour: "2-digit", 
          minute: "2-digit", 
        };
        return new Date(getValue()).toLocaleDateString("en-GB", options);
      }
    },
    {
      accessorKey: 'details',
      header: 'Details',
      cell: ({row}) => (
        <button className='bg-primary/60 dark:bg-primary-d/60 p-2 hover:bg-accent dark:hover:bg-accent-d transition-colors text-white active:bg-accent w-full h-full'
          onClick={() => {setExpandedRow(row.id === expandedRow ? null : row.id)}}
        >
          {expandedRow === row.id ? 'Hide' : 'Show'}
        </button>
      ),
      meta: {
        style: { width: '3rem' },
      }
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
      <table className='w-3/4 bg-secondary dark:bg-secondary-d p-6 m-6 rounded-md '>
        <thead>
          {
            table.getHeaderGroups().map(headerGroup => (
              <tr key={headerGroup.id}>
                {
                  headerGroup.headers.map(header => (
                    <th key={header.id} style={header.column.meta?.style}
                      className=' bg-primary dark:bg-primary-d text-white'
                    >
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
                <tr key={row.id} className='dark:even:bg-primary-d/40 dark:odd:bg-secondary-d even:bg-primary/40 odd:bg-secondary'>
                  {
                    row.getVisibleCells().map(cell => (
                      <td key={cell.id} className=' text-center' 
                          style={cell.column.meta?.style}
                      >
                        {
                          flexRender(cell.column.columnDef.cell, cell.getContext())
                        }
                      </td>
                    ))
                  }
                </tr>
                {expandedRow === row.id && (
                  <tr>
                    <td colSpan={columns.length} 
                      className=" text-center p-4"
                    >
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
      <div className='flex gap-7 items-center'>
        <div>
          <span className='bg-secondary rounded-md p-2 d:text-white dark:bg-secondary-d'>
            Page {table.getState().pagination.pageIndex + 1}
          </span>
        </div>
        <div className='flex gap-4'>
          <button
            onClick={() => {table.previousPage()}}
            disabled={!table.getCanPreviousPage()}
            className='bg-accent rounded-md p-1 px-2 text-white disabled:bg-gray-300'
          >
            Prev
          </button>
          <button
            onClick={() => {table.nextPage()}}
            disabled={!table.getCanNextPage()}
            className='bg-accent rounded-md p-1 px-2 text-white disabled:bg-gray-300'
          >
            Next
          </button>
        </div>
      </div>
    </>
  );
}


export default DataTable;