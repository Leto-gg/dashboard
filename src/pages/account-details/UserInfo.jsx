import PropTypes from "prop-types";
import Avatar from "@mui/material/Avatar";
import Stack from "@mui/material/Stack";
import Tooltip from "@mui/material/Tooltip";
import { IconButton } from "@mui/material";
import { EditOutlined } from "@ant-design/icons";
import { Form, CustomTextField } from "./AccountDetails";

export function UserInfo({ user }) {
  return (
    <Stack spacing={2} alignItems="flex-start">
      <Form>
        <Stack spacing={2}>
          <Stack
            direction="column"
            spacing={1}
            position="relative"
            width="fit-content"
          >
            <Avatar sx={{ height: 100, width: 100 }} />
            <Tooltip
              placement="right"
              title="Image upload not available at this time"
            >
              <IconButton
                disableRipple
                disableTouchRipple
                aria-label="upload new picture"
                sx={{
                  position: "absolute",
                  zIndex: 2,
                  borderRadius: "50%",
                  right: -10,
                  bottom: -5,
                  margin: 0,
                  boxShadow: "sm",
                }}
              >
                <EditOutlined />
              </IconButton>
            </Tooltip>
          </Stack>
          <Tooltip
            placement="top"
            title="Name change not available at this time"
          >
            <CustomTextField
              label="Name"
              name="name"
              aria-readonly
              aria-label="readonly name field"
              variant="outlined"
              spellCheck={false}
              value={user.name}
              fullWidth
            />
          </Tooltip>
          <Tooltip placement="top" title="Email change not supported">
            <CustomTextField
              label="Email"
              name="email"
              variant="outlined"
              aria-label="readonly email field"
              aria-readonly
              spellCheck={false}
              value={user.email}
              fullWidth
            />
          </Tooltip>
        </Stack>
      </Form>
    </Stack>
  );
}
UserInfo.propTypes = {
  user: PropTypes.object.isRequired,
};
