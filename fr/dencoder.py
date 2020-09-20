raw_table = """a a
à 'a
â 'b
æ 'd
b b
c c
ç 'c
d d
e e
é 'e
è 'f
ê 'g
ë 'h
f f
g g
h h
i i
î 'i
ï 'j
j j
k k
l l
m m
n n
o o
ô 'o
œ 'p
p p
q q
r r
s s
t t
u u
ù 'u
û 'v
ü 'w
v v
w w
x x
y y
ÿ 'y
z z
' ''"""

table_fr_en = {y[0]: y[1] for y in [x.split(" ") for x in raw_table.split("\n")]}

table_en_fr = {v: k for k, v in table_fr_en.items()}

#print out encoding map
print("encode with:")
for k, v in table_fr_en.items():
	print(k, v)
print()

#print out decoding map
print("decode with:")
for k, v in sorted(table_en_fr.items()):
	print(k, v)
print()

def encode_fr(str):
	ret = []

	for char in str:
		if char in table_fr_en:
			ret.append(table_fr_en[char])
		else:
			ret.append(char)

	return "".join(ret)

def decode_fr(str):
	ret = []

	#for loop
	i = 0
	while i < len(str):
		if str[i] == "'":
			#invalid quote escape sequence
			if not i + 1 < len(str) or str[i:i+2] not in table_en_fr:
				return None
			ret.append(table_en_fr[str[i:i+2]])
			i += 1
		elif str[i] in table_en_fr:
			ret.append(table_en_fr[str[i]])
		else:
			ret.append(str[i])
		i += 1

	return "".join(ret)
