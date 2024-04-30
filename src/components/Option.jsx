import React, { useState } from "react";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

export default function LanguageSelect() {
  const [language, setLanguage] = useState("");

  const handleChange = (event) => {
    setLanguage(event.target.value);
  };

  return (
    <Box sx={{ minWidth: 80, minHeight: 20 }}>
      <FormControl fullWidth>
        <InputLabel id="language-select-label">Lang:</InputLabel>
        <Select
          labelId="language-select-label"
          id="language-select"
          value={language}
          label="Language"
          onChange={handleChange}
        >
          <MenuItem value="uz">UZ</MenuItem>
          <MenuItem value="en">EN</MenuItem>
          <MenuItem value="ru">RU</MenuItem>
        </Select>
      </FormControl>
    </Box>
  );
}
