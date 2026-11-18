# 词嵌入 + 位置编码
# 词嵌入: 将每个字符转换为一个固定量的向量表示
# 位置编码: 为每个字符添加一个位置信息的向量表示

# 输入向量 = 词嵌入 + 位置编码

import numpy as np


CORPUS = "hello world transformer model attention is all you need"
# 极小的语料库, 模型将从中学到字符级别的序列规律

# 构建字符级别词汇表
chars = sorted(list(set(CORPUS)))  # 去重并排序
vocab_size = len(chars)  # 词汇表大小

# 构建双向映射字典 (字符 <--> 索引)
char_to_idx = {ch: i for i, ch in enumerate(chars)}  # 字符到索引的映射\
idx_to_char = {i: ch for ch, i in char_to_idx.items()}  # 索引到字符的映射\

# 将整个预料转换为索引序列
data = np.array([char_to_idx[ch] for ch in CORPUS], dtype=np.int32)

# 构建训练样本 -- 滑动窗口  用连续的seq_len个字符作为输入序列, 目标是预测下一个字符 (seq_len + 1)
#seq_len = 8
# 位置 0 - 7: "hello wo" -> "r"
# 位置 1 - 8: "ello world" -> "e"
# 位置 2 - 9: "llo world" -> "l"

seq_len = 8

inputs = []  # 用来存放所有输入序列
targets = []  # 用来存放所有目标序列

# 滑动窗口遍历预料，生成训练样本
for i in range(len(data) - seq_len):
  inputs.append(data[i:i+seq_len])
  targets.append(data[i+seq_len])

# 转换为NumPy数组(张量)
inputs = np.array(inputs)
targets = np.array(targets)

print(f"\n训练样本数: {len(inputs)}")  
print(f"\输入形状: {inputs.shape}, 目标形状: {targets.shape}") # (47, 8)  (47, )

print(f"示例-输入索引: {inputs[0]}, 目标索引: {targets[0]}")  

print(f"示例-输入字符: {''.join(idx_to_char[i] for i in inputs[0])} -> 目标字符: {idx_to_char[targets[0]]}")  

