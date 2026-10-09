import {
  useEffect,
  useMemo,
  useState,
} from "react";

import SearchInput from "./SearchInput";
import Pagination from "./Pagination";
import Badge from "./Badge";
import Loader from "./Loader";

import usePagination from "../../hooks/usePagination";
import { money } from "../../utils/formatCurrency";

const EMPTY_DATA = [];

export default function DataPage({
  title,
  description,
  data = EMPTY_DATA,
  loadData,
  columns,
}) {
  const [rowsData, setRowsData] = useState(data);
  const [query, setQuery] = useState("");
  const [loading, setLoading] =
    useState(Boolean(loadData));
  const [error, setError] = useState("");

  useEffect(() => {
    if (!loadData) {
      setRowsData(data);
      return undefined;
    }

    let active = true;

    loadData()
      .then((rows) => {
        if (active) {
          setRowsData(rows);
        }
      })
      .catch((loadError) => {
        if (active) {
          setError(loadError.message);
        }
      })
      .finally(() => {
        if (active) {
          setLoading(false);
        }
      });

    return () => {
      active = false;
    };
  }, [data, loadData]);

  const filtered = useMemo(
    () =>
      rowsData.filter((row) =>
        JSON.stringify(row)
          .toLowerCase()
          .includes(query.toLowerCase())
      ),
    [rowsData, query]
  );

  const {
    page,
    setPage,
    pages,
    data: rows,
  } = usePagination(filtered, 7);

  return (
    <>
      <div className="mb-6">
        <h1 className="text-2xl font-bold md:text-3xl">
          {title}
        </h1>

        <p className="mt-1 text-sm muted">
          {description}
        </p>
      </div>

      <div className="panel p-4">
        <div className="mb-4 max-w-sm">
          <SearchInput
            value={query}
            onChange={setQuery}
          />
        </div>

        {error && (
          <p
            role="alert"
            className="mb-4 rounded-lg bg-red-500/10 p-3 text-sm text-red-300"
          >
            {error}
          </p>
        )}

        {loading ? (
          <Loader />
        ) : (
          <div className="table-wrap">
            <table className="data-table">
              <thead>
                <tr>
                  {columns.map((column) => (
                    <th key={column.key}>
                      {column.label}
                    </th>
                  ))}
                </tr>
              </thead>

              <tbody>
                {rows.map((row, index) => (
                  <tr key={row.id ?? index}>
                    {columns.map((column) => (
                      <td key={column.key}>
                        {column.badge ? (
                          <Badge>
                            {row[column.key]}
                          </Badge>
                        ) : column.money ? (
                          money(row[column.key] || 0)
                        ) : (
                          row[column.key] ?? "—"
                        )}
                      </td>
                    ))}
                  </tr>
                ))}

                {rows.length === 0 && (
                  <tr>
                    <td
                      colSpan={columns.length}
                      className="text-center muted"
                    >
                      No records found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        )}

        {!loading && pages > 1 && (
          <Pagination
            page={page}
            pages={pages}
            setPage={setPage}
          />
        )}
      </div>
    </>
  );
}