# 3D 角色模型来源

| 文件 | 原始资源 | 作者 | 许可 |
| --- | --- | --- | --- |
| `character.glb` | Ultimate Animated Character Pack · `Casual_Male` | Quaternius（quaternius.com） | CC0 1.0 |

- 小念和爸爸共用这一个模型：运行时各自克隆一份，用不同的身高、头身比例和配色区分，爸爸另外加了一副眼镜。和「身体奇遇记」「化学奇遇记」「物理奇遇记」是同一份文件，「奇遇记」系列里的两个人长得一模一样。
- 获取镜像：`github.com/wellmota/tutory-personagens`（`quaternius-uac/`，仓库内附 CC0 许可说明）。
- 本项目处理：只保留首页星球实际使用的 `Idle`、`Jump`、`Victory` 三个动作，并配合同视角首帧透明海报 `public/images/home-duo-poster.webp` 供首屏瞬时显示，空闲加载完成后平滑切换至实时 3D。
- 颜色、卡通着色、描边、腮红、眼镜，以及首页星球上的显微镜、向日葵、培养皿、DNA 双螺旋、细胞和蝴蝶，都在运行时由代码添加（`src/series/duo-stage.ts`、`src/learning/home-planet.ts`），原始文件里没有。
- CC0 不要求署名，这里记录来源是为了方便以后追溯和替换。
