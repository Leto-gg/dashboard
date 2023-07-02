import PropTypes from "prop-types";

import {
  Chip,
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

import { getFormattedDate } from "../../../libs/utils/date.helpers";
import { DeleteOutlined } from "@ant-design/icons";

function getCidTypeChipColor(cidType) {
  switch (cidType) {
    case "ipfs":
      return "primary";
    case "ipns":
      return "info";
    default:
      return "primary";
  }
}

/**
 * @typedef Props
 * @property {object[]} cidAnalytics
 * @property {boolean} isLoading
 * @property {(cid: object) => void} onRemove
 */

/**
 * @param {Props} props
 */
export function CIDTable({ cidAnalytics = [], isLoading = false, onRemove }) {
  if (isLoading) {
    return <CircularProgress variant="indeterminate" />;
  }

  if (cidAnalytics.length === 0) {
    return (
      <Typography variant="body1">No CIDs are being tracked by you</Typography>
    );
  }

  return (
    <TableContainer>
      <Table stickyHeader>
        <TableHead>
          <TableRow>
            <TableCell>CID</TableCell>
            <TableCell>Type</TableCell>
            <TableCell>Last Accessed</TableCell>
            <TableCell></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {cidAnalytics.map((content) => (
            <TableRow key={content.cid}>
              <TableCell>{content.cid}</TableCell>
              <TableCell>
                <Chip
                  aria-label="cid type"
                  color={getCidTypeChipColor(content.cidType, {})}
                  label={content.cidType.toUpperCase()}
                  variant="filled"
                />
              </TableCell>
              <TableCell>{getFormattedDate(content.lastAccessed)}</TableCell>
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
  );
}

CIDTable.propTypes = {
  cidAnalytics: PropTypes.array,
  isLoading: PropTypes.bool,
  onRemove: PropTypes.func.isRequired,
};
