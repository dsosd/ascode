raw_table = """а a
б '6
в v
г r
д g
е e
ё 'e
ж 'x
з z
и u
й 'u
к k
л l
м m
н h
о o
п n
р p
с c
т t
у y
ф 'q
х x
ц 'v
ч '4
ш w
щ 'w
ъ 'b
ы i
ь b
э '3
ю 'o
я q
' ''"""

table_ru_en = {y[0]: y[1] for y in [x.split(" ") for x in raw_table.split("\n")]}

table_en_ru = {v: k for k, v in table_ru_en.items()}

#print out encoding map
print("encode with:")
for k, v in table_ru_en.items():
	print(k, v)
print()

#print out decoding map
print("decode with:")
for k, v in sorted(table_en_ru.items()):
	print(k, v)
print()

def encode_ru(str):
	ret = []

	for char in str:
		if char in table_ru_en:
			ret.append(table_ru_en[char])
		else:
			ret.append(char)

	return "".join(ret)

def decode_ru(str):
	ret = []

	#for loop
	i = 0
	while i < len(str):
		if str[i] == "'":
			#invalid quote escape sequence
			if not i + 1 < len(str) or str[i:i+2] not in table_en_ru:
				return None
			ret.append(table_en_ru[str[i:i+2]])
			i += 1
		elif str[i] in table_en_ru:
			ret.append(table_en_ru[str[i]])
		else:
			ret.append(str[i])
		i += 1

	return "".join(ret)
