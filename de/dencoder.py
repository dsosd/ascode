raw_table = """a a
ä 'a
b b
c c
d d
e e
f f
g g
h h
i i
j j
k k
l l
m m
n n
o o
ö 'o
p p
q q
r r
s s
ß 's
t t
u u
ü 'u
v v
w w
x x
y y
z z
' ''"""

table_de_en = {y[0]: y[1] for y in [x.split(" ") for x in raw_table.split("\n")]}

table_en_de = {v: k for k, v in table_de_en.items()}

#print out encoding map
print("encode with:")
for k, v in table_de_en.items():
	print(k, v)
print()

#print out decoding map
print("decode with:")
for k, v in sorted(table_en_de.items()):
	print(k, v)
print()

def encode_de(str):
	ret = []

	for char in str:
		if char in table_de_en:
			ret.append(table_de_en[char])
		else:
			ret.append(char)

	return "".join(ret)

def decode_de(str):
	ret = []

	#for loop
	i = 0
	while i < len(str):
		if str[i] == "'":
			#invalid quote escape sequence
			if not i + 1 < len(str) or str[i:i+2] not in table_en_de:
				return None
			ret.append(table_en_de[str[i:i+2]])
			i += 1
		elif str[i] in table_en_de:
			ret.append(table_en_de[str[i]])
		else:
			ret.append(str[i])
		i += 1

	return "".join(ret)
