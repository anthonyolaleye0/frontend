import { Eye, MoreHorizontal } from 'lucide-react';
import React, { useEffect, useRef, useState } from 'react';
import type { TableColumn } from 'react-data-table-component';
import DataTable from 'react-data-table-component';
import { createPortal } from 'react-dom';
import {
  MdOutlineCheckBox,
  MdOutlineCheckBoxOutlineBlank,
} from 'react-icons/md';
import { Link } from 'react-router-dom';
import type {
  AllTaxLawType,
  ReusableTaxLawTableProps,
} from '../constants/types';
import { capitalizeFirstLetter } from '../hooks/functions';
import { CircularLoader } from './Loader';
import MyCustomTooltip from './MyCustomTooltip';
import { Separator } from './ui/separator';

const ReusableDecidedCaseTable: React.FC<ReusableTaxLawTableProps> = ({
  data,
  loading,
  title,
  totalRows,
  onPageChange,
  userRole,
  errorMessage,
  // roleToFetch,
}) => {
  console.log('data:', data);
  console.log('errorMessage:', errorMessage);
  const [openDropdownId, setOpenDropdownId] = useState<string | null>(null);
  const [selectedIds, setSelectedIds] = useState<string[]>([]);

  const dropdownRefs = useRef<Record<string, HTMLButtonElement | null>>({});
  const isChosenRefs = useRef<Record<string, HTMLButtonElement | null>>({});
  const dropdownContainerRef = useRef<HTMLDivElement | null>(null);
  const isAllSelected =
    selectedIds?.length === data?.length && data?.length > 0;

  const handleSelectAll = () => {
    if (isAllSelected) {
      setSelectedIds([]);
    } else {
      const allIds = data.map((item) => item._id.toString());
      setSelectedIds(allIds);
    }
  };

  const handleSelectOne = (rowId: string) => {
    setSelectedIds((prevSelected) =>
      prevSelected.includes(rowId)
        ? prevSelected.filter((id) => id !== rowId)
        : [...prevSelected, rowId],
    );
  };

  const handleToggleDropdown = (rowId: string) => {
    setOpenDropdownId((prevId) => (prevId === rowId ? null : rowId));
  };

  // const handleToggleModal = (rowId: string) => {
  //   setIsModalOpen(true);

  //   setActiveRowId(rowId);
  //   setOpenDropdownId(null);
  //   console.log('rowId:', rowId);
  // };

  // useEffect(() => {
  //   const updateDropdownPositions = () => {
  //     const newMap: Record<string, boolean> = {};
  //     Object.entries(dropdownRefs.current).forEach(([id, el]) => {
  //       if (el) {
  //         const rect = el.getBoundingClientRect();
  //         const spaceBelow = window.innerHeight - rect.bottom;
  //         newMap[id] = spaceBelow < 150;
  //       }
  //     });
  //     setDropUpMap(newMap);
  //   };

  //   updateDropdownPositions();
  //   window.addEventListener('resize', updateDropdownPositions);
  //   return () => window.removeEventListener('resize', updateDropdownPositions);
  // }, [data]);

  const handleCopyId = async (id: string) => {
    try {
      await navigator.clipboard.writeText(id);
      setOpenDropdownId(null);
      console.log('Copied ID:', id);
    } catch (error) {
      console.log('Failed to copy ID', error);
    }
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const clickedElement = event.target as Node;

      // If no dropdown is open, do nothing
      if (!openDropdownId) return;

      const triggerButton = dropdownRefs.current[openDropdownId];
      const dropdownEl = dropdownContainerRef.current;

      const clickedInsideButton =
        triggerButton && triggerButton.contains(clickedElement);

      const clickedInsideDropdown =
        dropdownEl && dropdownEl.contains(clickedElement);

      if (!clickedInsideButton && !clickedInsideDropdown) {
        setOpenDropdownId(null);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [openDropdownId]);

  const renderDropdown = (rowId: string) => {
    // const isDropUp = dropUpMap[rowId] ?? false;
    const anchor = dropdownRefs.current[rowId];

    if (!anchor) return null;

    const rect = anchor.getBoundingClientRect();

    const DROPDOWN_WIDTH = 154;
    const VIEWPORT_PADDING = 68;

    const dropdownHeight = dropdownContainerRef.current?.offsetHeight ?? 200;

    const spaceBelow = window.innerHeight - rect.bottom;
    const spaceAbove = rect.top;

    const shouldDropUp =
      spaceBelow < dropdownHeight && spaceAbove > dropdownHeight;

    const left = Math.min(rect.left, window.innerWidth - DROPDOWN_WIDTH - 100);

    let top = shouldDropUp ? rect.top - 100 : rect.bottom + 4;
    // let top = shouldDropUp ? rect.top - dropdownHeight - 4 : rect.bottom + 4;

    top = Math.max(
      VIEWPORT_PADDING,
      Math.min(top, window.innerHeight - dropdownHeight - VIEWPORT_PADDING),
    );

    const style = {
      position: 'absolute' as const,
      // top: isDropUp ? rect.top - 100 : rect.bottom,
      // left: rect.left,
      top,
      left,
      zIndex: 9999,
      background: 'white',
      boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
      borderRadius: '0.5rem',
      width: `${DROPDOWN_WIDTH}px`,
      gap: '10px',
      padding: '0.5rem',
    };

    return createPortal(
      <div
        ref={dropdownContainerRef}
        style={style}
        className="flex flex-col items-start rounded border text-start text-[13px]"
      >
        <p>Actions</p>
        <button
          onClick={() => handleCopyId(rowId)}
          className="block hover:bg-mustard hover:rounded px-1 hover:text-white cursor-pointer text-gray-700"
        >
          Copy ID
        </button>
        <Separator />
      </div>,
      document.getElementById('dropdown-root')!,
    );
  };

  const columns: TableColumn<AllTaxLawType>[] = [
    {
      name: (
        <button className="text-[18px]" onClick={handleSelectAll}>
          {isAllSelected ? (
            <MdOutlineCheckBox />
          ) : (
            <MdOutlineCheckBoxOutlineBlank />
          )}
        </button>
      ),
      width: '48px',
      grow: 0,
      // selector: (row) => row.status,
      // sortable: true,

      cell: (row) => {
        const rowId = String(row._id);
        const isChecked = selectedIds.includes(rowId);

        return (
          <div className="relative inline-block text-left">
            <button
              onClick={() => handleSelectOne(rowId)}
              ref={(el) => {
                isChosenRefs.current[rowId] = el;
              }}
              className="text-[18px]"
            >
              {isChecked ? (
                <MdOutlineCheckBox />
              ) : (
                <MdOutlineCheckBoxOutlineBlank />
              )}
            </button>
          </div>
        );
      },
    },
    {
      name: 'Title',
      selector: (row) => capitalizeFirstLetter(row.title || ''),
      sortable: true,
      width: '180px',
      grow: 0,
    },
    // {
    //   name: 'Description',
    //   selector: (row) => row.description,
    //   sortable: true,
    //   width: '320px',
    //   grow: 0,
    // },
    {
      name: 'Year',
      selector: (row) => row.year,
      sortable: true,
      width: '90px',
      grow: 0,
    },
    {
      name: 'Total Chapters',
      selector: (row) => row.totalChapters,
      sortable: true,
      width: '130px',
      grow: 0,
    },
    {
      name: 'Total Parts',
      selector: (row) => row.totalParts,
      sortable: true,
      width: '130px',
      grow: 0,
    },
    {
      name: 'Total Sections',
      selector: (row) => row.totalSections,
      sortable: true,
      width: '130px',
      grow: 0,
    },
    {
      name: 'Total Subsections',
      selector: (row) => row.totalSubsections,
      sortable: true,
      width: '150px',
      grow: 0,
    },
    {
      name: 'Total Schedules',
      selector: (row) => row.totalSchedules,
      sortable: true,
      width: '150px',
      grow: 0,
    },
    {
      name: 'Action',
      cell: (row) => {
        const rowId = String(row._id);
        const isOpen = openDropdownId === rowId;

        return (
          <div className="relative inline-block text-left">
            <div className="flex items-center gap-2 justify-center">
              <MyCustomTooltip
                content="View Details"
                bgColor="bg-blue-gray"
                textColor="text-white"
              >
                <Link
                  to={`/dashboard/${userRole}/decided-cases/${rowId}`}
                  className="bg-sky-blue text-white px-3 py-1 rounded cursor-pointer"
                >
                  <Eye size={18} />
                </Link>
              </MyCustomTooltip>

              <button
                onClick={() => handleToggleDropdown(rowId)}
                ref={(el) => {
                  dropdownRefs.current[rowId] = el;
                }}
                className=" text-gray-600 text-3xl px-3 cursor-pointer"
              >
                <MoreHorizontal />
              </button>
            </div>
            {isOpen && renderDropdown(rowId)}
          </div>
        );
      },
    },
  ];

  return (
    <div className="">
      <DataTable
        title={title}
        columns={columns}
        data={data}
        progressPending={loading}
        progressComponent={<CircularLoader text="Loading..." />}
        pagination
        paginationServer
        paginationTotalRows={totalRows}
        onChangePage={onPageChange}
        noDataComponent={
          <div className="py-6 text-center text-gray-500">
            {errorMessage || 'No decided cases found...'}
          </div>
        }
      />
    </div>
  );
};

export default ReusableDecidedCaseTable;
