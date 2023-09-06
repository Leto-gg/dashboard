import PropTypes from "prop-types";

import {
  CircularProgress,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import Typography from "@mui/material/Typography";
import TablePagination from "@mui/material/TablePagination";
import Paper from "@mui/material/Paper";

import { DeleteOutlined } from "@ant-design/icons";
import { useCallback } from "react";

/**
 * @typedef Props
 * @property {object[]} cidAnalytics
 * @property {boolean} isLoading
 * @property {(cid: object) => void} onRemove
 */

/**
 * @param {Props} props
 */
export function CIDTable({
  cidAnalytics = [],
  isLoading = false,
  onRemove,
  pagination = {},
  onPageChange,
}) {
  const handlePageChange = useCallback(
    (_, newPage) => {
      onPageChange && onPageChange(newPage + 1);
    },
    [onPageChange]
  );

  if (isLoading) {
    return <CircularProgress variant="indeterminate" />;
  }

  if (cidAnalytics.length === 0) {
    return (
      <Typography variant="body1">No CIDs are being tracked by you</Typography>
    );
  }

  return (
    <Paper>
      <TableContainer>
        <Table stickyHeader>
          <TableHead>
            <TableRow>
              <TableCell>CID</TableCell>
              <TableCell></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {cidAnalytics.map((content) => (
              <TableRow key={content._id}>
                <TableCell>{content.cid}</TableCell>
                <TableCell>
                  <IconButton onClick={() => onRemove(content)}>
                    <DeleteOutlined />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[]}
        count={pagination?.total}
        rowsPerPage={10}
        page={pagination?.page - 1}
        onPageChange={handlePageChange}
      />
    </Paper>
  );
}

CIDTable.propTypes = {
  cidAnalytics: PropTypes.array,
  isLoading: PropTypes.bool,
  onRemove: PropTypes.func.isRequired,
  pagination: PropTypes.object,
  onPageChange: PropTypes.func,
};
