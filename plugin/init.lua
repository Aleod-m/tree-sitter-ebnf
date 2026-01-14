vim.filetype.add({extension = {ebnf = "ebnf"}})

vim.api.nvim_create_autocmd("FileType", {
	pattern = "ebnf",
	callback = function(event)
		vim.bo[event.buf].commentstring = "/* %s */"
	end,
})
